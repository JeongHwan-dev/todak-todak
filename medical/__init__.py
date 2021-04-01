from flask import Flask
# --------------------------------- [edit] ---------------------------------- #
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()
migrate = Migrate()
# --------------------------------------------------------------------------- #


def create_app():
    app = Flask(__name__)
# --------------------------------- [edit] ---------------------------------- #    
    app.config.from_object(config)

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    from . import models

    # 블루프린트
# --------------------------------------------------------------------------- #    
    from .views import main_views
    app.register_blueprint(main_views.bp)

    return app





# 구조 : 전체폴더(RESISTER) - register - __init__.py
# 현재 위치를 RESISTER로.
# export FLASK_APP=register
# export FLASK_ENV=development
# flask run 