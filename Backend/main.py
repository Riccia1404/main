from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
import mysql.connector
from fastapi import FastAPI, HTTPException, Request
app = FastAPI()
templates = Jinja2Templates(directory="templates")
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

app.add_middleware(
    SessionMiddleware,
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4200/loginpage"],
    allow_credentials=True,  # Aggiungi questo
    allow_methods=["*"],
    allow_headers=["*"],
    secret_key="gg",  # Sostituisci con una chiave sicura
    session_cookie="session_cookie"
)

# Connessione al database MySQL
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="garage",  # Inserisci il tuo nome utente del database
    password="Riccia.1404*",  # Inserisci la password del database
    database="virtualpitstop",  # Inserisci il nome del tuo database
    port=3306
)

# Endpoint per testare la connessione al database
@app.get("/test_db")
def test_db():
    try:
        cursor = conn.cursor()
        query = "SELECT email FROM utente;"
        print("sto eseguendo la query di utente"); 
        cursor.execute(query)  # Query di test
        print(query); 
        result = cursor.fetchall()  # Prende il primo risultato
        data = [{"email": row[0]} for row in result]
        return JSONResponse(content=data)
    except mysql.connector.Error as err:
        return JSONResponse(content={"error": f"Errore nel recupero dei dati: {err}"})
    finally:
        if 'cursor' in locals():
            cursor.close()
  
