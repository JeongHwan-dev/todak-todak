from flask import Blueprint
from flask import Flask, request, jsonify, session
import bcrypt
from flask_cors import CORS
from .. import models
import json
from datetime import datetime, timedelta
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)

bp = Blueprint('auth', __name__, url_prefix='/')

<<<<<<< HEAD

@bp.route('/sign-up', methods=['POST'])
=======
# # bp 테스트
# @bp.route('/') 
# def home():
#     return 'auth page ok'


@bp.route('/sign-up', methods=['POST']) 
>>>>>>> origin/Dev/Community
def register():
    print("check")  # 확인용... 나중에 삭제할것
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402

    else:
        print('check')
        signup_data = request.get_json(force=True)['data']
        email = signup_data["email"]
        password = signup_data["password"]
        name = signup_data["name"]

        nickname = signup_data["nickname"]

        print(email, password, name, nickname)  # 확인용....나중에 삭제할것

        emailcheck = models.User.query.filter_by(email=email).first()
        nicknamecheck = models.User.query.filter_by(nickname=nickname).first()
        print(emailcheck)
        if not(name and email and password):
            return jsonify({"msg": "빈칸 오류", 'status': 301})
        elif emailcheck is not None:
            return jsonify({"msg": "이미 가입된 이메일입니다.", 'status': 302})
        elif nicknamecheck is not None:
            return jsonify({"msg": "닉네임이 존재할때", 'status': 303})
        else:
            hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            user = models.User(
                nickname=nickname,
                email=email,
                name=name,
                pw=hashpw,
                date=datetime.now()
            )
            models.db.session.add(user)
            models.db.session.commit()
            return jsonify({"msg": "회원가입 성공", 'status': 300})
        return jsonify({'msg': 'complete'})


@bp.route('/', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        print('check')

        login_data = request.get_json(force=True)['data']
        userEmail = login_data["userEmail"]
        userPassword = login_data["userPassword"]

        print(userEmail, userPassword)
        if not userEmail:
            return jsonify({"msg": "아이디 치세요", 'status': 401})

        elif not userPassword:
            return jsonify({"msg": "비번 치세요", 'status': 401})

<<<<<<< HEAD
        checkpw = models.User.query.filter_by(email=userEmail).first()
        print('checkpw:', checkpw)
        if bcrypt.checkpw(userPassword.encode('utf-8'), checkpw.pw.encode('utf-8')):
            print('ok')
=======
        queried=models.User.query.filter_by(email=userEmail).first()
        print('checkpw:', queried)
        if bcrypt.checkpw(userPassword.encode('utf-8'), queried.pw.encode('utf-8')):
>>>>>>> origin/Dev/Community
        # Identity can be any data that is json serializable
            access_token = create_access_token(identity=queried.id)
            refresh_token = create_refresh_token(identity=queried.id)
            print('ok')
<<<<<<< HEAD

            user_object = {
                "id": checkpw.id,
                "email": checkpw.email,
                "nickname": checkpw.nickname,
                "usertype": checkpw.usertype
            }

            return jsonify({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user_object': user_object,
                'status': 400})
=======
            print(queried.id, queried.nickname)
            user_object={
                "id": queried.id,
                "email": queried.email,
                "nickname": queried.nickname,
                "usertype": queried.usertype
            }

            return jsonify({
                            'access_token':access_token, 
                            'refresh_token':refresh_token, 
                            'user_object':user_object,
                            'status':400
                        })
>>>>>>> origin/Dev/Community
        else:
            return jsonify({"msg": "비밀번호 불일치", "status": 401})
