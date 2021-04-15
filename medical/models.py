from medical import db, client
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


class Userprofile(db.Model):
    __tablename__ = 'userprofile'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    userid = Column(Integer, ForeignKey('user.id'))
    profilephotourl = Column(String(200), nullable=False)
    userintroduction = Column(String(1000), nullable=False)
    userlocation = Column(String(100), nullable=False)
    userdiseases = Column(String(100), nullable=False)
    userage = Column(Integer, nullable=False)
    doctorpdfurl = Column(String(200), nullable=True)
    usertype = Column(String(32), nullable=True)

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


class Posthistory(db.Model):
    tablename = 'post_history'
    table_args = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    userid = Column(Integer)
    postid = Column(String(100), nullable=False)
    date = Column(DATE, nullable=False)
    posttype = Column(String(32), nullable=False)


class Commentinfo(db.Model):
    tablename = 'comment_info'
    table_args = {'mysql_collate': 'utf8_general_ci'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    postuserid = Column(Integer, nullable=False)
    commentuserid = Column(Integer, nullable=False)
    postdate = Column(DATE, nullable=False)
