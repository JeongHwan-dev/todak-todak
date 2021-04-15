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

bp = Blueprint('community', __name__, url_prefix='/')

mydb = models.client['medical']  # db name
mycol = mydb['community_post']  # collection name

# bp 테스트 /community붙여서 시험

# @bp.route('/')
# def home():

#     return 'community page ok'


# [CREATE] 게시글 생성
@bp.route('/article/post', methods=['POST'])
@jwt_required()
def create_article():

    body = literal_eval(request.get_json()['body'])
    print(body)
    userid = body['userid']
    nickname = body['nickname']
    # usertype = body['usertype']
    content = body['content']
    attachmentUrl = body['attachmentUrl']

    usercheck = models.Userprofile.query.filter_by(userid=userid).first()

    date = (datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    postingid = str(userid)+';'+str(date)
    print(content, date, type(userid))
    community = mycol.insert_one({
        "postingid": postingid,
        "userid": userid,
        "nickname": nickname,
        "usertype": usercheck.usertype,
        "content": content,
        "attachmentUrl": attachmentUrl,
        "date": date,
        "profilephotourl": usercheck.profilephotourl,
        'likepeople': []
    })
    print('creat_ok')
    return jsonify({"msg": "글생성 성공", 'status': 200})


# [READ] 게시글 읽기
@bp.route('/article/read', methods=['GET', 'POST'])
@jwt_required()
def read_article():
    if request.method == 'POST':
        print('read_ok')
        lst = []
        for m in mycol.find():
            lst.append({
                "postingid": m["postingid"],
                "userid": m["userid"],
                "nickname": m["nickname"],
                "usertype": m["usertype"],
                "content": m["content"],
                "attachmentUrl": m["attachmentUrl"],
                "date": m["date"],
                "profilephotourl": m['profilephotourl'],
                "likepeople": m['likepeople'],
                "likepeoplelength": len(m['likepeople'])
            })
            print(len(m['likepeople']))
        print('read.ok')
        return jsonify(lst)


# [UPDATE] 게시글 수정
@bp.route('/article/update', methods=['POST'])
@jwt_required()
def modify_articles():
    body = literal_eval(request.get_json()['body'])
    print(body)
    content = body['editContent']
    postingid = body['postingid']
    date = (datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    mycol.update_one(
        {'postingid': postingId},
        {'$set': {'content': content, 'date': date}}
    )
    print('update_ok')
    return jsonify({"msg": "수정완료 성공", 'status': 200})


# [DELETE] 게시글 삭제
@bp.route('/article/delete', methods=['POST'])
@jwt_required()
def delete_articles():
    body = literal_eval(request.get_json()['body'])
    postingid = body['postingid']

    mycol.delete_one({'postingid': postingid})
    mydb['comments_post'].delete_many({'postingid': postingid})

    return jsonify({"msg": "삭제성공", 'status': 200})


# [CLICK] 게시글 좋아요
@bp.route('/posting/like/click', methods=['POST'])
@jwt_required()
def click_like():
    body = literal_eval(request.get_json()['body'])
    postingid = body['postingid']
    userid = body['likeuser']

    mycol.update_one(
        {'postingid': postingid},
        {'$push': {'likepeople': userid}}
    )

    return jsonify({"msg": "삭제성공", 'status': 200})


# [CANCEL] 게시글 좋아요 취소
@bp.route('/posting/like/cancel', methods=['POST'])
@jwt_required()
def click_like_cancel():
    body = literal_eval(request.get_json()['body'])
    postingid = body['postingid']
    userid = body['likeuser']

    mycol.update_one(
        {'postingid': postingid},
        {'$pull': {'likepeople': userid}}
    )

    return jsonify({"msg": "삭제성공", 'status': 200})
