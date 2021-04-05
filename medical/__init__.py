from flask import Flask
# --------------------------------- [edit] ---------------------------------- #
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies, create_refresh_token)
import pymysql
from flask_cors import CORS
from pymongo import MongoClient


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

    
    
    #cors
    CORS(app, supports_credentials=True)
    
    # 블루프린트
# --------------------------------------------------------------------------- #    
    from .views import auth, community
    
    app.register_blueprint(auth.bp)
    app.register_blueprint(community.bp)    
    bcrypt = Bcrypt(app)

# Setup the Flask-JWT-Extended extension
    app.config['JWT_SECRET_KEY'] = 'todaktodak token'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(hours=20)

    jwt = JWTManager(app)
    
    return app



# 구조 : 전체폴더(RESISTER) - medical - __init__.py
# 현재 위치를 RESISTER로.
# export FLASK_APP=medical
# export FLASK_ENV=development
# flask run