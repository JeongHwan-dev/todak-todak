from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
from . import address
import json
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)
from ast import literal_eval


bp = Blueprint('localevent', __name__, url_prefix='/')

mydb = models.client['medical']  # db name
mycol = mydb['localevent']  # collection name

# 제목, 날짜시간, 운동종류, 장소1(서울특별시 강남구 역삼동), 
# 장소2(전체 주소 ex)낙섬중로129 304동 704호), 장소3(latlmg(위도경도, 리스트)),
# 개최자, 참가자(리스트)

@bp.route('/eventcreate', methods=['POST'])
@jwt_required()
def event_create():
    # body = literal_eval(request.get_json()['body'])
    # print(body)
    # title =body['title']
    # date =body['date']
    # workout =body['workout']
    # address =body['address']
    # hostid =body['hostid']


    # localevent = mycol.insert_one({
    #     "title": title,
    #     "date": date,
    #     "workout": workout,
    #     "address": address,
    #     "hostid": hostid,
    #     "guestid": []
        
    # })
    # print('eventcreat_ok')
    return jsonify({"msg": "이벤트 생성 성공", 'status': 200})

@bp.route('/eventread', methods=['POST'])
@jwt_required()
def event_read():
    body = literal_eval(request.get_json()['body'])

    userid=body['userid']
    lst = []

    due_date=datetime.now()

    checkaddress=models.Userprofile.filter_by(userid=userid)


    for m in mycol.find({"address":checkaddress.userlocation}):
        if due_date<m['date']:
            lst.append({
                "title": m["title"],
                "date": m["date"],
                "workout": m["workout"],
                "address": m["address"],
                "hostid": m["hostid"],
                "guestid": m['guestid'],
                
            })
    print('eventread.ok')
    return jsonify(lst)

@bp.route('/eventclick', methods=['POST'])
@jwt_required()
def eventclick():
    body = literal_eval(request.get_json()['body'])
    hostid = body['hostid']
    guestid = body['guestid']

    mycol.update_one(
        {'hostid': hostid},
        {'$push': {'guestid': guestid}}
    )

    return jsonify({"msg": "삭제성공", 'status': 200})