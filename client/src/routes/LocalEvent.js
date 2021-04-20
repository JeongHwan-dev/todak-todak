import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "35%",
    left: "35%",
  },
}));

export default function LocalEvent() {
    const url = 'http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000';
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    // 생성 데이터
    const [title, setTitle] = useState(""); // 제목
    const [date, setDate] = useState(""); // 날짜
    const [workout, setWorkout] = useState(""); //운동
    const [address, setAddress] = useState(""); // 장소

    const [newEventTitle, setNewEventTitle] = useState("");

    const [events, setEvents] = useState([]); // 이벤트 리스트

    const [hostids, setHostids] = useState()
    const [guestids, setGuestids] = useState();
    const [localEvents, setLocalEvents] = useState("");

    
    const onCreateEvent = async (event) => {
      event.preventDefault();
      await axios
        .post(url + "/eventcreate", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            date: date,
            workout: workout,
            address: address,
            hostid: sessionStorage.userid
          }),
          withCredentials: true,
        })
        .then(() => {
          console.log("[CREATE] 새로운 이벤트 생성");
          setNewEventTitle(title);
        })
        .catch(() => {
          alert("[CREATE] event response [x]");
        })
      setTitle("");
      setDate("");
      setWorkout("");
      setAddress("");
    };

    const onReadEvent = async (event) => {
      await axios
        .post(url + '/eventread', {
          method: "POST",
          body: JSON.stringify({ userid: sessionStorage.userid }),
          })
          .then((response) => {
            console.log("[READ] 이벤트 목록 Reloading");
            response.data.reverse();
            setEvents(response.data);
          })
          .catch(() => {
            alert("[READ] event response (x)")
          })
    };

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // 생성 핸들러
    const onTitlehandle = (event) => {
      setTitle(event.target.value);
    }
    const onDatehandle = (event) => {
      setDate(event.target.value);
    }
    const onWorkouthandle = (event) => {
      setWorkout(event.target.value);
    }
    const onAddresshandle = (event) => {
      setAddress(event.target.value);
    }



    const body = (
      <div className={classes.paper}>
        <h2 id="simple-modal-title">이벤트 만들기</h2>
        <input type="text" value={title} onChange={onTitlehandle} placeholder="이벤트 제목을 입력해주세요." />
        <input type="text" value={date} onChange={onDatehandle} placeholder="날짜를 입력해주세요." />
        <input type="text" value={workout} onChange={onWorkouthandle} placeholder="운동을 입력해주세요." />
        <input type="text" value={address} onChange={onAddresshandle} placeholder="주소를 입력해주세요." />
        <Button onClick={onCreateEvent}>이벤트 만들기</Button>
      </div>
    );

    const handleChangeJoinEvent = (e) => {
      if (e.target.value === sessionStorage.userid) {
        alert("자신이 만든 이벤트에는 참가할 수 없습니다")
      }
      const response = axios.post(url + '/eventread', {
        method: "POST",
        body: JSON.stringify({
          hostid: e.target.value,
          guestid: sessionStorage.userid
        }),
        withCredentials: true,
      }).then(response => {
        setLocalEvents('')
      response.data.result.map((data) =>
      setLocalEvents(localEvents => [...localEvents, data]))
      });
    }
    if (localEvents === "") {
      return (
        <Card>
            <Grid>
              <Row>
                <p>이벤트가 없습니다</p>
              </Row>
              <Row>
                <Button onClick={handleOpen}>새로운 이벤트 만들기</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
                </Row>
            </Grid>
          </Card>
      )
    } else {
      return (
        <Card>
          <Grid>
            <Row>
              {localEvents.address1}의 이벤트
            </Row>
            <hr/>
            {localEvents.map((localEvent) => 
            <Row>
            <Col>
              <Row>
                {localEvent.workout}
              </Row>
              <Row>
                {localEvent.guestid.length()}명의 토닥러가 참가합니다
              </Row>
            </Col>
            <Col>
              <Button value={localEvent.hostid} onClick={handleChangeJoinEvent}>참여하기</Button>
            </Col>
          </Row>
            )}
            <Row>
              <Button>새로운 이벤트 만들기</Button>
            </Row>
          </Grid>
        </Card>
      )
    }
};