import React, { useState } from 'react';
import Icon from './Components/Icon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';     // import this css after bootstrap everytime..

const itemArray = new Array(9).fill("empty");

const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [isTie, setIsTie] = useState(false);

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill('empty');
    setIsTie(false);
  }

  const checkEmpty = (value) => {
    return value === 'empty';
  }

  const checkIsTie = () => {
    const idx = itemArray.findIndex(checkEmpty);
    if (idx === -1) {
      setIsTie(true);
    }
  }

  const checkIsWinner = () => {

    if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2]) {
      setWinMessage(`${itemArray[0]} won`);
    }
    else if (itemArray[3] !== 'empty' && itemArray[3] === itemArray[4] && itemArray[4] === itemArray[5]) {
      setWinMessage(`${itemArray[3]} won`);
    }
    else if (itemArray[6] !== 'empty' && itemArray[6] === itemArray[7] && itemArray[7] === itemArray[8]) {
      setWinMessage(`${itemArray[6]} won`);
    }
    else if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[3] && itemArray[3] === itemArray[6]) {
      setWinMessage(`${itemArray[0]} won`);
    }
    else if (itemArray[1] !== 'empty' && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7]) {
      setWinMessage(`${itemArray[1]} won`);
    }
    else if (itemArray[2] !== 'empty' && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8]) {
      setWinMessage(`${itemArray[2]} won`);
    }
    if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[4] && itemArray[4] === itemArray[8]) {
      setWinMessage(`${itemArray[0]} won`);
    }
    if (itemArray[2] !== 'empty' && itemArray[2] === itemArray[4] && itemArray[4] === itemArray[6]) {
      setWinMessage(`${itemArray[2]} won`);
    }

  }

  const changeItem = itemNumber => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }
    if (isTie) {
      return toast("Match is Tie", { type: "info" });
    }
    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      checkIsWinner();
      checkIsTie();
    }
    else {
      return toast('already filled', { type: 'error' });
    }
  }

  return (
    <Container className="p-4">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">

          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button
                color="success"
                block
                onClick={() => reloadGame()}
              >
                Reload the Game!!
              </Button>
            </div>
          ) : (
              isTie ? (
                <div className="mb-2 mt-2">
                  <h1 className="text-info text-uppercase text-center">
                    {"This Game is Tie"}
                  </h1>
                  <Button
                    color="info"
                    block
                    onClick={() => reloadGame()}
                  >
                    Reload the Game!!
                  </Button>
                </div>
              ) : (
                  <h1 className="text-center text-warning">
                    {isCross ? "cross" : "circle"} turns
                  </h1>
                )
            )}

          {/* {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button
              color="success"
              block
              onClick={() => reloadGame()}
              >
                Reload the Game!!
                </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "cross" : "circle" } turns
            </h1>
          )} */}

          <div className="grid">
            {itemArray.map((item, index) => (
              <Card onClick={() => changeItem(index)} className="shrink" >
                <CardBody className="box color" >
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
