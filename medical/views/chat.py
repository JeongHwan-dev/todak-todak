from flask import Blueprint
from flask import Flask, request, jsonify, session
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies, create_refresh_token)

bp = Blueprint('chat', __name__, url_prefix='/')

@bp.route('/friend', methods=['GET'])  
def friend():
    users = models.User.query.all()
    rooms = models.Channel.filter_by()
    userlist = []
    roomlist = []
    for user in users:
        userlist.append(user.name)
    for room in rooms:
        roomlist.append([room.id, room.userlist])
    return jsonify({"users":userlist, "rooms":roomlist})


@bp.route('/chat', methods=['POST'])  
def chat():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        print('check')
        username = request.json.get('userName')
        print('userName:', userName)
        userinfo=models.User.query.filter_by(name=username).first()
        return jsonify({"userinfo":userinfo, "status":200})