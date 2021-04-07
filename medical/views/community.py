from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta


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
    print('ok')
    body=request.get_json(force=True)['body'].split('"')
    userid=body[3]
    content=body[7]
    date=(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    community = models.mycol.insert_one({ 

                                    "userid":userid,
                                    "content":content,
                                    "date":date
                                        
                                })

    return jsonify({"msg": "글생성 성공", 'status': 200})


@bp.route('/article/read', methods=['GET', 'POST'])
def read_article():
    if request.method=='POST':
        lst=[]
        for m in models.mycol.find():
            lst.append({"content" : m['content'], "userid" : m["userid"], "date":m["date"]})
        print(lst)
        return jsonify(lst)

#     else:
#         body=request.get_json(force=True)['body'].split('"')
#         print(body)
#         # currentPage
#         # article = list(models.mycol.find())
#         # print(article)
#         return jsonify({})

# #수정버튼 클릭
# @bp.route('/article/update', methods=['PUT'])
# def modify_articles(article_id):

#     body=request.get_json(force=True)['body'].split('')

#     content = body[]
#     date=datetime.now()

#     models.mycolupdate_one(
#                             {'_id': article_id }, 
#                             {'$set':{'content' : content, 'date' : ''}}
#                         )

#     return jsonify({"msg": "수정완료 성공", 'status': 200})


# #삭제
# @bp.route('/article/delete', methods=['DELETE'])
# def delete_articles():

#     models.mycol.delete_one({'_id' : article_id})
    
#     return  jsonify({"msg": "삭제성공", 'status': 200})