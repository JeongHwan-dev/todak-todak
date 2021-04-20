import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import io from "socket.io-client";
import { SettingsOverscanOutlined } from "@material-ui/icons";

const endpoint = `${window.location.origin}:5000`;
const url = `${window.location.origin}:5000`;

const useStyles = makeStyles((theme) => ({
    container: {
      height: "100%"
    },
    spacingControl: {
      height: "100%",
      padding: theme.spacing(1),
    },
    autoScroll: {
      height: "20px"
    },
    userContainer: {
      height: "100%",
      width: "100%",
      boxShadow: "0px 2px 10px lightgray",
      borderRadius: "1rem",
      color: theme.palette.text.secondary
    },
    titleLeft: {
      height: "10%",
      width: "100%",
      fontWeight: "bold",
      lineHeight: "50px",
      borderBottom: "1px solid #e5e5e5"
    },
    titleText: {
      color: "black",
      verticalAlign: "middle"
    },
    titleRight: {
      height: "10%",
      width: "100%",
      fontWeight: "bold",
      lineHeight: "50px",
      borderBottom: "1px solid #e5e5e5"
    },
    userlist: {
      height: "85%",
      width: "100%",
      overflow: "auto",
      '&::-webkit-scrollbar': {
        width: "5px"
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#ff8a4e",
        borderRadius: "5px"
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "inset 0px 0px 2px white"
      },
    },
    user: {
      height: "90px",
      width: "100%",
      borderTop: "1px solid #e5e5e5",
      borderBottom: "1px solid #e5e5e5"
    },
    userPic: {
      width: "100%",
      height: "100%"
    },
    userNickname: {
      fontWeight: "bold",
      textAlign: "left",
      marginBottom: "1px"
    },
    userButton: {
      height: "100%",
      width: "100%",
      background: "white",
      border: "1px solid white",
      borderRadius: "1rem"
    },
    userlistFooter: {
      height: "5%",
      width: "100%",
      borderTop: "1px solid #e5e5e5"
    },
    messageContainer: {
      height: "100%",
      width: "100%",
      boxShadow: "0px 2px 10px lightgray",
      borderRadius: "1rem"
    },
    message: {
      height: "75%",
      width: "100%",
      padding: "15px",
      overflow: "auto",
      '&::-webkit-scrollbar': {
        width: "5px"
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#ff8a4e",
        borderRadius: "5px"
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "inset 0px 0px 2px white"
      },
    },
    mymessage: {
      textAlign: "right"
    },
    othermessage: {
      textAlign: "left"
    },
    inputContainer: {
      height: "15%",
      padding: theme.spacing(1),
      borderTop: "1px solid #e5e5e5"
    },
    inputText: {
      width: "100%",
      padding: "10px",
      border: "1px solid #e5e5e5",
      borderRadius: "1rem",
      "&:focus, &:active": {
        width: "100%",
        border: "2px solid #d6d6d6",
        borderRadius: "1rem",
        outline: "none",
      },
    },
    sendButton: {
      padding: theme.spacing(1),
      background: "#ff8a4e",
      color: "white",
      width: "100%"
    }
  }));

const Chat = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  const [toUser, setToUser] = useState(props.targetuser);
  const [room, setRoom] = useState();
  console.log("Chat.js rendering");
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const socketIO = useRef();
  const lastRef = useRef();

  async function onUserHandler(event) {
    const response = await axios.post(url + "/chatlist", {
      headers: { "Content-Type": "application/json" },
      from_user: sessionStorage.userid,
      withCredentials: true,
    });
    setUsers(response.data.users);
    console.log("유저목록변경: ", users);
  }

  const enterRoom = async (toUser) => {
    const response = await axios.post(url + "/room", {
      headers: { "Content-Type": "application/json" },
      data: {
        user1: sessionStorage.userid,
        user2: toUser,
      },
      withCredentials: true,
    });
    if (response.data.status === 300) {
      setToUser(toUser);
      console.log("방 변경. user: ", toUser);
      setRoom(response.data.roomid);
      console.log("방 변경. room: ", room);
    } else {
      alert("방 참여에 실패");
    }
  };

  useEffect(() => {
    enterRoom(toUser);
    console.log("채널입장")
  }, [])

  useEffect(() => {
    socketIO.current = io(endpoint);
    console.log('socketIO.current: ', socketIO.current);
    console.log('socketIO.current.connected: ', socketIO.current.connected);
    if (room > 0){
      socketIO.current.emit("join", {
        name: sessionStorage.nickname,
        from_user: sessionStorage.userid,
        to_user: toUser,
        room: room
      });
    }
    console.log("방 입장. room: ", room);
    console.log('socketIO.current.connected: ', socketIO.current.connected);
    onUserHandler();
    console.log("유저목록 출력");
    socketIO.current.on("chatHistory", (data) => {
      setMessages([]);
      console.log("chatHistory: ", data);
      for(var i=0;i<data.length;i++){
        setMessages((messages) => [...messages, [data[i]['message'], data[i]['userid']]]);
      }
      lastRef.current.scrollIntoView();
    });

    socketIO.current.on("receiveMessage", (data) => {
      console.log(data, "emitMessage");
      setMessages((messages) => [...messages, [data.message, data.userid]]);
    });
    return () => {
      socketIO.current.emit("leave", {
        name: sessionStorage.nickname,
        from_user: sessionStorage.userid,
        to_user: toUser,
        room: room
      });
    };
  }, [room]);

  const userName = Object.keys(users).map((id) => (
      <li key={id} className={classes.user}>
        <Grid container className={classes.spacingControl}>
          <Grid container item xs={3} className={classes.spacingControl}>
            <img src="./images/default_profile.png" className={classes.userPic} />
          </Grid>
          <Grid container item xs className={classes.spacingControl}>
            <button key={id} onClick={() => enterRoom(id) } className={classes.userButton}>
              <p className={classes.userNickname}>{users[id]}</p>
            </button>
          </Grid>
        </Grid>
      </li>
  ));

  const onSendMessage = () => {
    console.log("userid:", sessionStorage.userid);
    socketIO.current.emit("sendMessage", {
      message: messageRef.current.value,
      nickname: sessionStorage.nickname,
      room: room,
      from_user: sessionStorage.userid,
      to_user: props.targetuser
    });
    messageRef.current.value = "";
    lastRef.current.scrollIntoView();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid container item xs={4} className={classes.spacingControl}>
          <div className={classes.userContainer}>
            <div className={classes.titleLeft}>
              <p className={classes.titleText}>메세지 목록</p>
            </div>
            <ul className={classes.userlist}>{userName}</ul>
          </div>
        </Grid>
        <Grid container item xs className={classes.spacingControl}>
          <div className={classes.messageContainer}>
            <Grid className={classes.titleLeft}>
              <p>방 번호: {room}</p>
              {/* <p>{ onCheck==true ? 'Online' : 'Offline'}</p> */}
            </Grid>
            <Grid className={classes.message}>
              {messages.map((msg, idx) => (
                msg[1] == sessionStorage.userid ?
                (<p className={classes.mymessage} key={idx}>{msg[0]}</p>):
                (<p className={classes.othermessage} key={idx}>{msg[0]}</p>)
              ))}
              <div className={classes.autoScroll} ref={lastRef}></div>
            </Grid>
            <Grid container className={classes.inputContainer}>
              <Grid container item xs={9} className={classes.spacingControl}>
                  <input type="text" placeholder="메세지 입력하기" onKeyPress={handleKeyPress} ref={messageRef} className={classes.inputText}/>
              </Grid>
              <Grid container item xs className={classes.spacingControl}>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={<Icon>send</Icon>}
                  onClick={onSendMessage}
                >
                보내기
                </Button>
              </Grid>
            </Grid>
            </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
