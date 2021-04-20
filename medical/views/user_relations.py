from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
import json
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)
from ast import literal_eval

bp = Blueprint('user_relations', __name__, url_prefix='/')

mydb = models.client['medical']  # db name

@bp.route('/user-relations', methods=['POST'])
def graphSend():

    body = literal_eval(request.get_json()['body'])
    userid = body['userid']

    x_list = [userid]
    m_list = []
    y_list = []
    result = {'nodes': [], 'links': []}

    for m in mydb['community_post'].find({'userid': userid}):
        m_list.append(m['postingid'])
        for x in mydb['comments_post'].find({'postingid': m['postingid']}):
            x_list.append(x['userid'])
    for x in x_list:
        for y in mydb['community_post'].find({'userid': x}):
            for t in mydb['comments_post'].find({"postingid": y['postingid']}):
                result['links'].append({ 'source': x, 'target': t['userid'] })

    

    for x in x_list:
        usercheck=models.User.query.filter_by(id=x).first()
        userprofilecheck=models.Userprofile.query.filter_by(userid=x).first()
        result['nodes'].append({ 'id': x , 'nickname':usercheck.nickname, 'src':userprofilecheck.profilephotourl})
        result['links'].append({ 'source': userid, 'target': x })
        



    return jsonify({"data": result})


def forPostAlgorithm():
    body = literal_eval(request.get_json()['body'])
    userid = body['userid']

    x_list = [userid]
    m_list = []

    for m in mydb['community_post'].find({'userid': userid}):
        m_list.append(m['postingid'])
        for x in mydb['comments_post'].find({'postingid': m['postingid']}):
            x_list.append(x['userid'])

    return x_list