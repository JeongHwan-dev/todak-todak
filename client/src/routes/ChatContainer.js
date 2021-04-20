import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Col, Row } from "react-bootstrap";
import Chat from 'components/Chat.js';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "4vh",
      textAlign: "center"
    },
    blank: {
        height: "20px",
        width: "auto "
    },
    chat: {
        height: "500px",
        width: "auto"
    }
}));

function ChatContainer(props) {
    const history = useHistory();
    const classes = useStyles();

    const handleClickToHome = () => {
        history.push('/');
    }

  return (
    <Grid className={classes.root}>
        <Row>
            <img src="./images/todak_logo.png" height="50px"
            style={{ margin: "0 auto"}} onClick={handleClickToHome} />
        </Row>
        <Row>
            <Col>
            </Col>
            <Col xs={8}>
                <Row className={classes.blank}></Row>
                <Row className={classes.chat}>
                    <Chat targetuser={props.location.state['targetUser']} />
                </Row>
                <Row className={classes.blank}></Row>
            </Col>
            <Col>
            </Col>
        </Row>
    </Grid>

  );
}

export default ChatContainer;
