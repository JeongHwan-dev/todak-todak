from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta

bp = Blueprint('community', __name__, url_prefix='/community')


# bp 테스트 /community붙여서 시험

@bp.route('/') 
def home():
    
    return 'community page ok'

# # #post, create
# @bp.route('/article/post', methods=['GET','POST']) 
# def get_article():
#     if request.method == 'GET':
#         article = list(db.articles.find({'_id' : article_id}))
#         sorted(article, key=lambda article: article['date'], reverse=True)
#         return jsonify({"msg": "기본 정보", 'status': 200})

#     else:
#         body=request.get_json(force=True)['body'].split('"')
         
#         content=body[]
#         comments=body[]
#         like=body[]
#         userId=None
#         date=(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
#         like=None

#         community = mycol.insert_one({
#                                         "id":"", 
#                                         "userid":"", 
#                                         "date":date, 
#                                         "content":content, 
#                                         "comments":comments, 
#                                         "like":like
#                                     })

#         return jsonify({"msg": "글생성 성공", 'status': 200})



# #수정버튼 클릭
# @bp.route('/article/<article_id>/modify', methods=['PUT'])
# def modify_articles(article_id):
#     article = db.articles.find_one({'_id' : article_id})
    
#     return jsonify({"msg": "수정 게시물 게시성공", 'status': 200})