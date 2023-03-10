import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Confirm(props) {
  const [show, setShow] = useState(true);
  const close = (e) => {
    setShow(false);
    window.location.reload(false);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <Toast onClose={close} show={show} delay={1000} autohide>
          <Toast.Body>User Added Sucessfully!</Toast.Body>
        </Toast>
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </Row>
    </div>
  );
}

export default Confirm;
