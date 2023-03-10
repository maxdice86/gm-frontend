import React, { useState } from "react";
import { createClientReord } from "../services/RestServices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Confirm from "./Confirm";

function ModalAddRecord(props) {
  const [dates, setDate] = useState("");
  const [clients, setClient] = useState("");
  const [project, setProject] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [hours, setHours] = useState("");
  const [billable, setBillable] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [billRate, setBillRate] = useState("");

  const [validated, setValidated] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleBillRate = (e) => {
    billable === "No" ? setBillRate(0) : setBillRate(e.target.value);
  };

  const handleClose = () => {
    props.setShow(false);
    window.location.reload(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    const newRecord = {
      dates,
      clients,
      project,
      projectCode,
      hours,
      billable,
      firstName,
      lastName,
      billRate,
    };

    if (
      !Object.values(newRecord).includes(null) &&
      !Object.values(newRecord).includes("")
    ) {
      createClientReord(newRecord).then((response) => {
        setConfirm(true);
        alert("User Added Sucessfully");
      });
    }
    //props.setShow(false);
  };

  return (
    <>
      {confirm ? <Confirm /> : null}
      <Modal
        show={props.show}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setClient(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setProject(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs="4">
                <Form.Group>
                  <Form.Label>Project Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    maxLength={5}
                    onChange={(e) => setProjectCode(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Billable</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setBillable(e.target.value)}
                  >
                    <option></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>BillRate</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={0}
                    onChange={handleBillRate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Hours</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={0}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAddRecord;
