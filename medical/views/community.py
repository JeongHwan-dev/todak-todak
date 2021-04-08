from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
import json
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
def create_article():
    
    body=literal_eval(request.get_json()['body'])
    print(body)
    userid=body['userid']
    nickname=body['nickname']
    usertype=body['usertype']
    content=body['content']

    date=(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    print(content, date,type(userid))
    community = mycol.insert_one({ 

                                    "userid":userid,
                                    "nickname": nickname,
                                    "usertype": usertype,
                                    "content":content,
                                    "date":date
                                        
                                })
    print('creat_ok')
    return jsonify({"msg": "글생성 성공", 'status': 200})


@bp.route('/article/read', methods=['GET', 'POST'])
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
                "date":m["date"]
                })
        print('read.ok')
        return jsonify(lst)

#     else:
#         body=literal_eval(request.get_json()['body'])
#         print(body)
#         # currentPage
#         # article = list(models.mycol.find())
#         # print(article)
#         return jsonify({})

#수정버튼 클릭
@bp.route('/article/update', methods=['POST'])
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
def delete_articles():
    body=literal_eval(request.get_json()['body'])
    date=body['postingId']

    mycol.delete_one({'date' : date})
    
    return  jsonify({"msg": "삭제성공", 'status': 200})