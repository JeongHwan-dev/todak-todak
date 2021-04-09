from medical import db
from sqlalchemy import ForeignKey, DateTime, Column, Integer, String, DATE, Text
from sqlalchemy.orm import relationship, backref
# from flask.ext.mongoalchemy  import  MongoAlchemy


class User(db.Model):  # usertable
    __tablename__ = 'user'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(64), primary_key=True, unique=True)
    email = Column(String(64), unique=True)
    name = Column(String(32), nullable=False)
    pw = Column(String(64), nullable=False)
    date = Column(DATE, nullable=False)
    usertype = Column(String(32))

 # 넣을 때 항상 정렬 해서 넣기


class Channel(db.Model):
    __tablename__ = 'channel'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(32))
    user_one = Column(Integer, ForeignKey('user.id'))
    user_two = Column(Integer, ForeignKey('user.id'))


class Message(db.Model):
    __tablename__ = 'message'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(Text)
    from_user = Column(Integer, ForeignKey('user.id'))
    to_user = Column(Integer, ForeignKey('user.id'))
    channel_id = Column(Integer, ForeignKey('channel.id'))
    timestamp = Column(DateTime)


# class Post_history(db.Model): #post history table
#     tablename = 'post_history_table'
#     table_args = {'mysql_collate': 'utf8_general_ci'}

#     _id2 = db.Column(db.Integer, primary_key=True)
#     userid = db.Column(db.Integer, ForeignKey('usertable.id'))
#     date = db.Column(db.DATE,nullable=False)


# mydb = client['medical'] #db name
# mycol = mydb['community_post'] #collection name
# community = mycol.insert_one({"userid":"", "date":"", "content":"", "comments":"", "like":""})
