from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask

socketio = SocketIO(cors_allowed_origins="*")


@socketio.on_error_default
def error_handler(e):
    print('An error has occurred: ' + str(e))


@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']
    join_room(room)
    # print("====================are you here?=====================", room)
    emit("receiveMessage", {'greeting': name +
         ' 님이 들어왔습니다.'}, broadcast=False, to=room)


@socketio.on('sendMessage')
def send_message(data):
    message = data['message']
    room = data['room']

    print("sendMessage",  message, data)
    emit("receiveMessage", {'message': message}, broadcast=True, to=room)


@socketio.on('leave')
def on_leave():

    # print("LEAVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!")
    leave_room(room)