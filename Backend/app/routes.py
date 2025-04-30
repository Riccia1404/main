from urllib.parse import unquote
from functools import wraps
from flask import jsonify, request
from .models import db, User, RuoloEnum, Risposte, Domande, Punteggio, StatoEnum, CategoriaEnum
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import os
import re
import json

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user or user.ruolo != RuoloEnum.admin:
            return jsonify({"message": "Accesso negato: richiesto ruolo admin"}), 403
            
        return fn(*args, **kwargs)
    return wrapper

def init_routes(app):

    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.get_json()
        # ... (validazioni precedenti)

        try:
            new_user = User(
                email=data['email'],
                nome=data.get('nome', ''),
                cognome=data.get('cognome', ''),
                ruolo=RuoloEnum.cliente,
                creato_il=datetime.utcnow()  # Aggiungi questo campo
            )
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.email, expires_delta=timedelta(days=1))
            
            return jsonify({
                "message": "Registrazione completata",
                "token": access_token,
                "user": {
                    "nome": new_user.nome,
                    "cognome": new_user.cognome,
                    "email": new_user.email,
                    "ruolo": new_user.ruolo.value,
                    "creato_il": new_user.creato_il.isoformat()
                }
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Errore server: {str(e)}"}), 500

    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"message": "Dati mancanti"}), 400

        admin_email = os.getenv('ADMIN_EMAIL', 'Admin@gmail.com')
        admin_password = os.getenv('ADMIN_PASSWORD', 'Admin123')
        is_admin_login = data['email'] == admin_email and data['password'] == admin_password

        # Cerca l'admin se è un login admin
        if is_admin_login:
            user = User.query.filter_by(email=admin_email).first()
            
            # Crea l'admin se non esiste
            if not user:
                user = User(
                    email=admin_email,
                    nome='Admin',
                    cognome='System',
                    ruolo=RuoloEnum.admin,
                    creato_il=datetime.utcnow()
                )
                user.set_password(admin_password)
                db.session.add(user)
                db.session.commit()
                print("Admin creato nel database")

        else:
            # Logica per utenti normali
            user = User.query.filter_by(email=data['email']).first()
            if not user or not user.check_password(data['password']):
                return jsonify({"message": "Credenziali non valide"}), 401

        # Aggiorna ruolo se necessario
        if is_admin_login:
            user.ruolo = RuoloEnum.admin
        else:
            user.ruolo = RuoloEnum.cliente

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Errore di aggiornamento ruolo: {str(e)}"}), 500

        access_token = create_access_token(identity=user.email, expires_delta=timedelta(days=1))

        return jsonify({
            "message": "Login riuscito",
            "token": access_token,
            "user": {
                "nome": user.nome,
                "cognome": user.cognome,
                "ruolo": user.ruolo.value,
                "email": user.email,
                "creato_il": user.creato_il.isoformat()
            }
        }), 200
    
    @app.route('/api/domande/<categoria>', methods=['GET'])
    @jwt_required()
    def get_domande_by_categoria(categoria):
        try:
                # Decodifica e normalizza la categoria
            categoria_decoded = unquote(categoria).strip()
            
            # Converti in Enum mantenendo il case originale
            categoria_enum = CategoriaEnum(categoria_decoded)
            
            # Esegui la query
            domande = Domande.query.filter_by(categoria=categoria_enum).all()
            
            # Costruisci la risposta
            result = []
            for domanda in domande:
                risposte = Risposte.query.filter_by(id_domanda=domanda.id_domanda).all()
                risposte_data = [{
                    "id_risposta": r.id_risposta,
                    "descrizione": r.descrizione,
                    "stato": r.stato.value
                } for r in risposte]
                
                result.append({
                    "id_domanda": domanda.id_domanda,
                    "descrizione": domanda.descrizione,
                    "categoria": domanda.categoria.value,
                    "risposte": risposte_data
                })

            return jsonify(result), 200

        except ValueError as e:
            return jsonify({"message": f"Categoria '{categoria_decoded}' non valida"}), 422
        except Exception as e:
            app.logger.error(f"Errore: {str(e)}")
            return jsonify({"message": "Errore interno del server"}), 500


    @app.route('/api/logout', methods=['POST'])
    @jwt_required()
    def logout():
        return jsonify({"message": "Logout effettuato con successo"}), 200

    @app.route('/api/profilo', methods=['GET'])
    @jwt_required()
    def get_profile():
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if not user:
            return jsonify({"message": "Utente non trovato"}), 404

        return jsonify({
            "email": user.email,
            "nome": user.nome,
            "cognome": user.cognome,
            "ruolo": user.ruolo.value,
            "creato_il": user.creato_il.isoformat()
        }), 200

    @app.route('/api/domande', methods=['GET'])
    @jwt_required()
    def get_domande():
        try:
            search_term = request.args.get('search', '').lower()
            
            query = Domande.query
            if search_term:
                query = query.filter(
                    (Domande.descrizione.ilike(f'%{search_term}%')) | 
                    (Domande.categoria.ilike(f'%{search_term}%'))
                )
            domande = query.all()
            result = []
            for domanda in domande:
                risposte = Risposte.query.filter_by(id_domanda=domanda.id_domanda).all()
                risposte_data = [{
                    "id_risposta": r.id_risposta,
                    "descrizione": r.descrizione,
                    "stato": r.stato.value
                } for r in risposte]
                result.append({
                    "id_domanda": domanda.id_domanda,
                    "descrizione": domanda.descrizione,
                    "risposte": risposte_data
                })
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"message": f"Errore: {str(e)}"}), 500
        
    @app.route('/api/punteggio', methods=['POST'])
    @jwt_required()
    def save_punteggio():
        user_email = get_jwt_identity()
        data = request.get_json()
        if not data or 'valore' not in data:
            return jsonify({"message": "Dati mancanti"}), 400
        try:
            nuovo_punteggio = Punteggio(
                valore=data['valore'],
                email=user_email,
                creato_il=datetime.now()
            )
            db.session.add(nuovo_punteggio)
            db.session.commit()
            return jsonify({"message": "Punteggio salvato"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Errore: {str(e)}"}), 500
    

    @app.route('/api/creaDomande', methods=['POST'])
    @jwt_required()
    @admin_required
    def create_domande():
        try:
            data = request.get_json()

            # Estrarre i campi principali per la domanda
            descrizione_domanda = data.get('descrizione')
            risposte_data = data.get('risposte', [])

            # Crea la nuova domanda
            nuova_domanda = Domande(descrizione=descrizione_domanda, categoria=data.get('categoria'))
            db.session.add(nuova_domanda)
            db.session.commit()  # Facciamo il commit per avere l'id_domanda assegnato

            # Creiamo le risposte associate
            for r in risposte_data:
                # Se 'stato' è un enum, assicurati di convertire il valore correttamente
                nuova_risposta = Risposte(
                    descrizione=r.get('descrizione'),
                    stato=r.get('stato'),  # Se stato è un intero o enum, adatta di conseguenza
                    id_domanda=nuova_domanda.id_domanda
                )
                db.session.add(nuova_risposta)

            db.session.commit()

        # Prepariamo la risposta JSON con la nuova domanda e risposte
            return jsonify({
                "message": "Domanda creata con successo!",
                "domanda": {
                    "id_domanda": nuova_domanda.id_domanda,
                    "descrizione": nuova_domanda.descrizione,
                    "risposte": [
                        {
                            "descrizione": r.descrizione,
                            "stato": r.stato.value if hasattr(r.stato, 'value') else r.stato
                        }
                        for r in Risposte.query.filter_by(id_domanda=nuova_domanda.id_domanda).all()
                    ]
                }
            }), 201

        except Exception as e:
            db.session.rollback()  # Importante fare rollback in caso di errore
            return jsonify({"message": f"Errore: {str(e)}"}), 500

    @app.route('/api/domande/<int:id_domanda>', methods=['DELETE'])
    @jwt_required()
    @admin_required
    def delete_domanda(id_domanda):
        try:
            domanda = Domande.query.get_or_404(id_domanda)
            
            # Elimina prima le risposte collegate
            Risposte.query.filter_by(id_domanda=id_domanda).delete()
            
            db.session.delete(domanda)
            db.session.commit()
            
            return jsonify({"message": "Domanda eliminata con successo"}), 200
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Errore: {str(e)}"}), 500



