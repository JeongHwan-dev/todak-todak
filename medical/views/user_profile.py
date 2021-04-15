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

bp = Blueprint('user-profile', __name__, url_prefix='/')


@bp.route('/user-profile', methods=['POST'])
def profile_create():

    body = literal_eval(request.get_json()['body'])
    print(body)
    useremail = body['useremail']
    profilephotourl = body['profilephotourl']
    userintroduction = body['userintroduction']
    userlocation = body['userlocation']
    userdiseases = body['userdiseases']
    userage = body['userage']
    doctorpdfurl = body['doctorpdfurl']
    usertype = body['usertype']
    diseases = ''

    for i in userdiseases:
        diseases += i+';'

    print(len(userdiseases))
    print(useremail, profilephotourl, userintroduction,
          userlocation, userdiseases, userage, doctorpdfurl, usertype)
    useridcheck = models.User.query.filter_by(email=useremail).first()

    userprofile = models.Userprofile(
        userid=useridcheck.id,
        profilephotourl=profilephotourl,
        userintroduction=userintroduction,
        userlocation=userlocation,
        userdiseases=diseases,
        userage=userage,
        doctorpdfurl=doctorpdfurl,
        usertype=usertype
    )

    models.db.session.add(userprofile)
    models.db.session.commit()
    print('profile_ok')
    return jsonify({"msg": "프로필 생성", 'status': 200})
