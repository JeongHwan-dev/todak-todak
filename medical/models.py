from medical import db, client
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
# from flask.ext.mongoalchemy  import  MongoAlchemy 


class User(db.Model): #usertable
    __tablename__ = 'user'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nickname= db.Column(db.String(64), primary_key=True, unique=True)
    email = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(32),nullable=False)
    pw = db.Column(db.String(64),nullable=False)
    date=db.Column(db.DATE,nullable=False)
    usertype=db.Column(db.String(32))


# class Post_history(db.Model): #post history table
#     tablename = 'post_history_table'
#     table_args = {'mysql_collate': 'utf8_general_ci'}

#     _id2 = db.Column(db.Integer, primary_key=True)
#     userid = db.Column(db.Integer, ForeignKey('usertable.id'))
#     date = db.Column(db.DATE,nullable=False)


mydb = client['medical'] #db name
mycol = mydb['community_post'] #collection name
# community = mycol.insert_one({"userid":"", "date":"", "content":"", "comments":"", "like":""})