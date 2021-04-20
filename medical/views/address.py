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

mydb = models.client['medical']  # db name

bp = Blueprint('address', __name__, url_prefix='/')

def getGeoCode(address):
    url = 'https://dapi.kakao.com/v2/local/search/address.json?query={}'.format(address)

    # KAKAO REST API 토큰 인증 - 2021/4/17 8:25 토큰 갱신 (2달간 유효)
    headers = {"Authorization": "KakaoAK 04de723842147da1e82c04d45333a895"}

    # url 로 위경도 정보 호출
    result = json.loads(str(requests.get(url, headers=headers).text))

    # 위경도 정보 호출 실패 시 위도 경도 값 각각 "-" 값으로 대체
    if result['documents'] == []:
        return "-", "-"
    else:
        match_first = result['documents'][0]['address']

        # y 좌표(위도), x 좌표(경도) 반환
        return float(match_first['y']), float(match_first['x'])


# [CANCEL] 댓글 좋아요 취소
@bp.route('/address', methods=['POST'])
def address():
    body = literal_eval(request.get_json()['body'])
    address=body['address']
    return jsonify(getGeoCode(address))

@bp.route('/address/local', methods=['POST'])
def local():
    body = literal_eval(request.get_json()['body'])
    userid = body['userid']
    print('addressok')
    usercheck=models.User.query.filter_by(id=userid).first()
    userprofilecheck=models.Userprofile.query.filter_by(userid=userid).first()
    lst=[]
    userlocationcheck=list(models.Userprofile.query.filter_by(userlocation=userprofilecheck.userlocation))
    for i in userlocationcheck:
        lst.append(i.userid)
        
    return jsonify({"nickname": usercheck.nickname,"local":userprofilecheck.userlocation, "localpeople":len
    (lst)})