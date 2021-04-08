from flask_socketio import SocketIO, emit, send, join_room, leave_room

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('message')
def handle_message(data):
    name = data['name']
    room = data['room']
    message = data['message']
    print('name, room, message:', name, room, message)
    emit("message2", message, broadcast=True)

@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']
    join_room(room)
    emit("message2", name + ' 님이 들어왔습니다.', room=room, broadcast=True)
    # send(message, broadcast=True)

@socketio.on('leave')
def on_leave(data):
    name = data['name']
    room = data['room']
    leave_room(room)
    print(name + "님이 나갔습니다.")
    send(name + ' 님이 나갔습니다.', room=room, broadcast=True)

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

