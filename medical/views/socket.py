from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask, request
from .. import models
from json import dumps
from datetime import date, datetime

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))

socketio = SocketIO(cors_allowed_origins="*")

mydb = models.client['medical'] #db name
mycol = mydb['chatdata'] #collection name

@socketio.on_error_default
def error_handler(e):
    print('An error has occurred: ' + str(e))

@socketio.on('join')
def on_join(data):
    name = data['name']
    from_user = data['from_user']  # 누른 사람 user id
    to_user = data['to_user']  # 눌린 사람 user id
    room = data['room']
    join_room(room, sid=request.sid)
    users = sorted([from_user, to_user])
    query = models.IsJoin.query.filter_by(room_id=room)
    is_join = query.first()

    if not is_join:
        print(f'error!')
    if users[0] == from_user:
        is_join.user_one = 1
    elif users[1] == from_user:
        is_join.user_two = 1
    models.db.session.commit()

    # ChatHistory
    chatlist=[]
    query = {"room_id":room}
    # print("query:", query)
    for chat in mycol.find(query):
        chatlist.append({
            'userid':chat['from_user'],
            'message':chat['nickname'] + ": " + chat['message'],
            'room': chat['room_id']
        })
    # print("chatlist:", chatlist)
    new_value = {'$set': {'is_read': True}}
    x = mycol.update_many(query, new_value)
    emit("chatHistory", chatlist, broadcast=False, to=room)


@socketio.on('sendMessage')
def send_message(data):
    nickname = data['nickname'].replace('"', "")
    message_db = data['message']
    message = nickname + ": " + message_db
    room_id = data['room']
    from_user = data['from_user']  
    to_user = data['to_user'] 
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    message_query = {
        'room_id': room_id,
        'from_user': from_user,
        'nickname': nickname,
        'to_user': to_user,
        'message': message_db,
        'timestamp': timestamp,
        'is_read': False
    }

    is_join = models.IsJoin.query.filter_by(room_id=room_id).first()

    if is_join.user_one and is_join.user_two:  # 둘다 접속중일때만
        # 몽고db에 읽은 메세지로 저장
        message_query['is_read'] = True
    mycol.insert_one(message_query)

    emit("receiveMessage", {'userid':from_user, 'message': message}, broadcast=False, to=room_id)

@socketio.on('leave')
def on_leave(data):
    from_user = data['from_user']  # 누른 사람 user id
    to_user = data['to_user']  # 눌린 사람 user id
    user = sorted([from_user, to_user])
    room = data['room']
    nickname = data['name']
    is_join = models.IsJoin.query.filter_by(room_id=room)
    if user[0] == from_user:
        is_join.user_one = 0
    elif user[1] == from_user:
        is_join.user_two = 0
    models.db.session.commit()

    leave_room(room, sid=request.sid)
    emit("receiveMessage", {'greeting': nickname +
         ' 님이 나갔습니다.'}, broadcast=False, to=room)