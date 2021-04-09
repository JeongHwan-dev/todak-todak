from flask import Flask, request, session, Blueprint
from flask_socketio import SocketIO, send, emit, join_room, leave_room

socketio = SocketIO(cors_allowed_origins="*")


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    send(message, namespace='/chat')
    # request_data = request.get_json()
    # print("request_data ========== [", request_data, "]")


@socketio.on('join')
def on_join(channel_data):
    # print("================================\n",
    #       data, "===============================\n")
    username = channel_data['username']
    room = channel_data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)


@socketio.on('leave')
def on_leave(channel_data):
    user_one = channel_data['username']
    room = channel_data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


# class InitiateChat(Resource):

    # def post(self):
    #     request_data = request.get_data()
    # from_user = request_data.get('from_user', '')
    # to_user = request_data.get('to_user', '')

    # channel = Channel.query.filter(Channel.from_user.in_([from_user, to_user])) \
    #     .filter(Channel.to_user.in_([from_user, to_user])) \
    #     .first()
    # if not channel:
    #     chat_channel = "private-chat_%s_%s" % (from_user, to_user)

    #     new_channel = Channel()
    #     new_channel.from_user = from_user
    #     new_channel.to_user = to_user
    #     new_channel.name = chat_channel
    #     db.session.add(new_channel)
    #     db.session.commit()
    # else:
    #     chat_channel = channel.id


# user_no = 1

# @app.before_request
# def before_request():
#     global user_no
#     if 'session' in session and 'user-id' in session:
#         pass
#     else:
#         session['session'] = os.urandom(24)
#         session['username'] = 'user'+str(user_no)
#         user_no += 1

# @socketio.on('connect', namespace='/mynamespace')
# def connect():
#     emit("response", {'data': 'Connected', 'username': session['username']})

# @socketio.on('disconnect', namespace='/mynamespace')
# def disconnect():
#     sessoin.clear()
#     print("Disconnected")

# @socketio.on("request", namespace='/mynamespace')
# def request(message):
#     emit("response", {'data':message['data'], 'username':session['username']}, broadcast=True)
