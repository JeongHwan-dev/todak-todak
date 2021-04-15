from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
import json
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies, create_refresh_token)
from ast import literal_eval

bp = Blueprint('community', __name__, url_prefix='/')

mydb = models.client['medical'] #db name
mycol = mydb['community_post'] #collection name

# bp 테스트 /community붙여서 시험

# @bp.route('/') 
# def home():
    
#     return 'community page ok'


#post, create
@bp.route('/article/post', methods=['POST']) 
@jwt_required()
def create_article():
    
    body=literal_eval(request.get_json()['body'])
    print(body)
    userid=body['userid']
    nickname=body['nickname']
    usertype=body['usertype']
    content=body['content']
    attachmentUrl=body['attachmentUrl']

    profilephoto=models.Userprofile.query.filter_by(userid=userid).first()
    
    date=(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    print(content, date,type(userid))
    community = mycol.insert_one({ 

                                    "userid":userid,
                                    "nickname": nickname,
                                    "usertype": usertype,
                                    "content":content,
                                    "attachmentUrl":attachmentUrl,
                                    "date":date,
                                    "profilephotourl": profilephoto.profilephotourl
                                })
    print('creat_ok')
    return jsonify({"msg": "글생성 성공", 'status': 200})


@bp.route('/article/read', methods=['GET', 'POST'])
@jwt_required()
def read_article():
    if request.method=='POST':
        print('read_ok')
        lst=[]
        for m in mycol.find():
            print(m['userid'])
            lst.append({
                "userid":m["userid"],
                "nickname":m["nickname"],
                "usertype":m["usertype"],
                "content":m["content"],
                "attachmentUrl": m["attachmentUrl"],
                "date":m["date"],
                "profilephotourl": m['profilephotourl']
                })
        print('read.ok')
        return jsonify(lst)


#수정버튼 클릭
@bp.route('/article/update', methods=['POST'])
@jwt_required()
def modify_articles():
    body=literal_eval(request.get_json()['body'])
    print(body)
    content = body['editContent']
    postingId=body['postingId']
    date=(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    mycol.update_one(
                    {'date': postingId}, 
                    {'$set':{'content' : content, 'date' : date}}
                    )
    print('update_ok')
    return jsonify({"msg": "수정완료 성공", 'status': 200})


#삭제
@bp.route('/article/delete', methods=['POST'])
@jwt_required()
def delete_articles():
    body=literal_eval(request.get_json()['body'])
    date=body['postingId']

    mycol.delete_one({'date' : date})
    
    return  jsonify({"msg": "삭제성공", 'status': 200})
