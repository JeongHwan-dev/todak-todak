import os
from flask_cors import CORS
BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/medical'.format(os.path.join(BASE_DIR, 'medical.db'))
SQLALCHEMY_TRACK_MODIFICATIONS = False
