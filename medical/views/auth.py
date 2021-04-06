from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta


bp = Blueprint('auth', __name__, url_prefix='/')



# bp 테스트
# @bp.route('/') 
# def home():
#     print(list(models.mycol.find()))
#     return 'auth page ok'


@bp.route('/sign-up', methods=['POST']) 
def register():
    print("check") #확인용... 나중에 삭제할것
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    
    else:
        body=request.get_json(force=True)['body'].split('"')
        email = body[3]
        password = body[7]
        name = body[11]
        nickName=body[15]
        
        print(email,password, name, nickName) #확인용....나중에 삭제할것
        
        emailcheck=models.User.query.filter_by(email=email).first()
        nicknamecheck=models.User.query.filter_by(nickname=nickName).first()
        

        if not(name and email and password):
            return jsonify({"msg": "빈칸 오류",'status': 301})
        elif emailcheck is not None:
            return jsonify({"msg": "이미 가입된 이메일입니다.", 'status': 302})
        elif nicknamecheck is not None:
            return jsonify({"msg": "닉네임이 존재할때", 'status': 303})

        else:
            hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            usertable=models.User(
                nickname= nickName,
                email = email,
                name = name,
                pw = hashpw,
                data = datetime.now()

            )
            models.db.session.add(usertable)
            models.db.session.commit()
            return jsonify({"msg": "회원가입 성공", 'status':300})
        return jsonify({'msg':'complete'})

@bp.route('/sign-in', methods=['POST'])  
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request", 'status':402})

    userId = request.json.get('userId')
    userPassword = request.json.get('userPassword')


    if not userId:
        return jsonify({"msg": "아이디 치세요", 'status':401})
    if not userPassword:
        return jsonify({"msg": "비번 치세요", 'status':401})

    checkpw=User.query.filter_by(email=userId).first()
    if bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):

    # Identity can be any data that is json serializable
        access_token = create_access_token(identity=userId)
        refresh_token = create_refresh_token(identity=userId)

        return jsonify( {'access_token':access_token, 'refresh_token':refresh_token,'status':400})



