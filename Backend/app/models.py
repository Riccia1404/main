from datetime import datetime
from . import db
import enum
from werkzeug.security import generate_password_hash, check_password_hash

class RuoloEnum(enum.Enum):
    admin = "admin"
    cliente = "cliente"

class User(db.Model):
    __tablename__ = 'utente'
    nome = db.Column(db.String(50), nullable=False)
    cognome = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False,primary_key=True)
    password = db.Column('psw', db.String(200), nullable=False)
    ruolo = db.Column(db.Enum(RuoloEnum), nullable=False, default=RuoloEnum.cliente)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
