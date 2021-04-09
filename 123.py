data = response.json.get(username)

user1 = data['user1']  // 누른 사람
user2 = data['user2']  // 눌린 사람
userlist = [user1, user2]

channel_check= models.Channel.filter_by(user1 in user_list && user2 in user_list).first()

if channel_check is None:


    room = {
    id : "",
    user_list : [user1, user2]
    }

    models.db.session.add(room)

else:

    return jsonify()



