from flask import Flask;
from flask_socketio import SocketIO, send, emit

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    send(message, broadcast=True)

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

