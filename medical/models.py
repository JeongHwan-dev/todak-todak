# --------------------------------- [edit] ---------------------------------- #
from medical import db




class User(db.Model): #데이터 모델을 나타내는 객체 선언
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    nickname= db.Column(db.String(32), unique=True)
    email = db.Column(db.String(32), unique=True)
    name = db.Column(db.String(32),nullable=False)
    pw = db.Column(db.String(100),nullable=False)
    data=db.Column(db.DATE)
    usertype=db.Column(db.String(32))
