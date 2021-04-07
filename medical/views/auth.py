from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies, create_refresh_token)

bp = Blueprint('auth', __name__, url_prefix='/')



# # bp 테스트
# @bp.route('/') 
# def home():
#     return 'auth page ok'


@bp.route('/sign-up', methods=['POST']) 
def register():
    print("check") #확인용... 나중에 삭제할것
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
        
    else:
        print('check')
        body=request.get_json(force=True)['body'].split('"')


        email = body[3]
        password = body[7]
        name = body[11]
        nickname=body[15]

        print(email,password, name, nickname) #확인용....나중에 삭제할것
        
        emailcheck=models.User.query.filter_by(email=email).first()
        nicknamecheck=models.User.query.filter_by(nickname=nickname).first()
        print(emailcheck)
        if not(name and email and password):
            return jsonify({"msg": "빈칸 오류",'status': 301})
        elif emailcheck is not None:
            return jsonify({"msg": "이미 가입된 이메일입니다.", 'status': 302})
        elif nicknamecheck is not None:
            return jsonify({"msg": "닉네임이 존재할때", 'status': 303})
        else:
            hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            user=models.User(
                nickname= nickname,
                email = email,
                name = name,
                pw = hashpw,
                date = datetime.now()
            )
            models.db.session.add(user)
            models.db.session.commit()
            return jsonify({"msg": "회원가입 성공", 'status':300})
        return jsonify({'msg':'complete'})

@bp.route('/', methods=['POST'])  
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        print('check')
        body=request.get_json(force=True)['body'].split('"')
        userEmail = body[3]
        userPassword = body[7]
        print(userEmail, userPassword)
        if not userEmail:
            return jsonify({"msg": "아이디 치세요", 'status':401})

        elif not userPassword:
            return jsonify({"msg": "비번 치세요", 'status':401})

        checkpw=models.User.query.filter_by(email=userEmail).first()
        print('checkpw:', checkpw)
        if bcrypt.checkpw(userPassword.encode('utf-8'), checkpw.pw.encode('utf-8')):
            print('ok')
        # Identity can be any data that is json serializable
            access_token = create_access_token(identity=checkpw.id)
            refresh_token = create_refresh_token(identity=checkpw.id)
            print('ok')
            return jsonify({'access_token':access_token, 'refresh_token':refresh_token, 'user_token': '1', 'status':400})
        else:
            return jsonify({"msg":"비밀번호 불일치", "status":401})