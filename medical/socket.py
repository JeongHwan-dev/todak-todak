from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('message', namespace='/chat')
def handle_message(data):
    name = data['name']
    room = data['room']
    message = data['message']
    join_room(room)
    print('name, room, message:', name, room, message)
    emit("message2", message, room=room, broadcast=True)

# @socketio.on('join', namespace='/chat')
# def on_join(data):
#     name = data['name']
#     room = data['room']
#     join_room(room)
#     emit("message2", name + ' 님이 들어왔습니다.', room=room, broadcast=True)
