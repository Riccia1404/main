from datetime import datetime
from . import db
from enum import Enum 
from werkzeug.security import generate_password_hash, check_password_hash

class RuoloEnum(Enum):
    admin = "admin"
    cliente = "cliente"

class StatoEnum(Enum):
    corretta = "corretta"
    sbagliata = "sbagliata"


class User(db.Model):
    __tablename__ = 'utente'
    nome = db.Column(db.String(50), nullable=False)
    cognome = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False,primary_key=True)
    password = db.Column('psw', db.String(200), nullable=False)
    ruolo = db.Column(db.Enum(RuoloEnum), nullable=False, default=RuoloEnum.cliente)
    creato_il = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Risposte(db.Model):
    __tablename__ = 'risposte'
    id_risposta = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(500), nullable=False)
    # stato = db.Column(db.Enum(StatoEnum), nullable=False)
    # id_domanda = db.Column(db.Integer, db.ForeignKey('domande.id_domanda'), nullable=False)

    stato = db.Column(db.Enum(StatoEnum), nullable=False)
    id_domanda = db.Column(db.Integer, db.ForeignKey('domande.id_domanda'), nullable=False)
    domanda = db.relationship('Domande', backref=db.backref('risposte', lazy=True))

class CategoriaEnum(Enum):
    STORIA = "Storia"
    GEOGRAFIA = "Geografia"
    SCIENZE = "Scienze"
    SPORT = "Sport"
    LETTERATURA_ITALIANA = "Letteratura Italiana"

class Domande(db.Model):
    __tablename__ = 'domande'
    id_domanda = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(500), nullable=False)
    categoria = db.Column(db.Enum(CategoriaEnum, values_callable=lambda x: [e.value for e in CategoriaEnum]), nullable=False, default=CategoriaEnum.STORIA)

class Punteggio(db.Model):
    __tablename__ = 'punteggio'
    ID_punteggio = db.Column(db.Integer, primary_key=True)
    valore = db.Column(db.Integer, nullable=False)
    creato_il = db.Column(db.DateTime, nullable=False, default=datetime.now)
    email = db.Column(db.String(100), db.ForeignKey('utente.email'), nullable=False)
    categoria = db.Column(db.Enum(CategoriaEnum, values_callable=lambda x: [e.value for e in CategoriaEnum]), nullable=False)
