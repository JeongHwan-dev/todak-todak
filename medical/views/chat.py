from flask import Blueprint
from flask import Flask, request, jsonify, session
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
import pymongo

from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)

bp = Blueprint('chat', __name__, url_prefix='/')

mydb = models.client['medical'] #db name
mycol = mydb['chatdata']


@bp.route('/chatlist', methods=['POST'])
@jwt_required()
def chatlist():
    from_user = request.get_json(force=True)['from_user']
    
    user_list = {}

    room_list=mycol.distinct('room_id', filter={'from_user':from_user})
    print("room_list: ", room_list)
    message_list=[]



    for user in mycol.find({'from_user':from_user}):
        usercheck = models.User.query.filter_by(id=user['to_user']).first()
        if usercheck.nickname not in user_list:
            user_list[user['to_user']] = usercheck.nickname

    for room_num in room_list:
        data=list(mycol.find({'room_id':room_num},{'_id':0,'room_id':1, 'message':1,'timestamp':1}).sort("timestamp",pymongo.DESCENDING).limit(1))
        message_list.append(data[0])
    # msg_data=sorted(message_list, key=lambda x:-x['timestamp'])
    # print('msg_data: ', msg_data)
    return jsonify({"users": user_list, "last_message": message_list})

@bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        username = request.json.get('userName')
        print('userName:', userName)

        userinfo = models.User.query.filter_by(name=username).first()
        return jsonify({"userinfo": userinfo, "status": 200})


@bp.route('/room', methods=['POST'])
@jwt_required()
def room():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        user_data = request.get_json(force=True)['data']
        user1 = user_data["user1"]
        user2 = user_data["user2"]

        lst = [user1, user2]  # 무조건 빠른 순서대로 방을 만들어서 중복되는 방의 생성을 없앤다
        lst.sort()
        roominfo = models.Channel.query.filter_by(
            user_one=lst[0], user_two=lst[1]).first()
        if roominfo is None:

            channel = models.Channel(
                user_one=lst[0],
                user_two=lst[1]
            )
            models.db.session.add(channel)
            models.db.session.commit()

            roominfo2 = models.Channel.query.filter_by(
                user_one=lst[0], user_two=lst[1]).first()

            is_join = models.IsJoin(
                room_id=roominfo2.id,
                user_one=0,
                user_two=0
            )
            models.db.session.add(is_join)
            models.db.session.commit()
            print(
                f'새로운방 생성. room == {roominfo2.id}, user_one == {user1}, user_two == {user2}')

            return jsonify({"msg": "방 생성 성공", "roomid": roominfo2.id, 'status': 300})
        else:
            roomid = roominfo.id
            

            print(
                f'기존방 입장. room == {roomid}, user_one == {lst[0]}, user_two == {lst[1]}')
            return jsonify({"roomid": roomid, "status": 300})