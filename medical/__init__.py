from flask import Flask
import logging
# --------------------------------- [edit] ---------------------------------- #
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)
import pymysql
from flask_cors import CORS
from pymongo import MongoClient

from .socket import socketio

db = SQLAlchemy()
migrate = Migrate()
client = MongoClient("mongodb://localhost:27017/medical")
# --------------------------------------------------------------------------- #


def create_app():
    app = Flask(__name__)
    # orm
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:@localhost:3306/medical"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    migrate.init_app(app, db)

    from . import models

    # cors
    CORS(app, supports_credentials=True)

    socketio.init_app(app)
    # 블루프린트
# --------------------------------------------------------------------------- #
    from .views import auth, community, chat, user_profile

    app.register_blueprint(chat.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(community.bp)
    app.register_blueprint(user_profile.bp)
    bcrypt = Bcrypt(app)


# Setup the Flask-JWT-Extended extension
    app.config['JWT_SECRET_KEY'] = 'todaktodak token'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    jwt = JWTManager(app)

    return app


# 구조 : 전체폴더(RESISTER) - medical - __init__.py
# 현재 위치를 RESISTER로.
# export FLASK_APP=medical
# export FLASK_ENV=development
# flask run
# mongod --dbpath data/db/


# 구조 : 전체폴더(RESISTER) - medical - __init__.py
# 현재 위치를 RESISTER로.
# export FLASK_APP=medical
# export FLASK_ENV=development
# flask run

# mongo설치방법
# curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
# sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
# sudo apt-get update
# sudo apt-get install -y mongodb-org
# project폴더에 data/db생성
# mongod --dbpath data/db/
# mongo
