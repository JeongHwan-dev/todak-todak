# --------------------------------- [edit] ---------------------------------- #
from medical import db

class User(db.Model): #데이터 모델을 나타내는 객체 선언
    id = db.Column(db.Integer, primary_key=True)
    nickname= db.Column(db.String(32), unique=True)
    email = db.Column(db.String(32), unique=True)
    username = db.Column(db.String(32))
    password = db.Column(db.String(100))
