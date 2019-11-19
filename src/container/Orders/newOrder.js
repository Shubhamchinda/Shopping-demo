import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import styles from "./styles.css";
import Request from "../../request";
import "react-datepicker/dist/react-datepicker.css";

const NewOrder = props => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [startDate, setDate] = useState(null);

  useEffect(() => {
    const { editableData } = props;
    if (editableData) {
      console.log(editableData, "EDIIIT");
      const { custAddress, dueDate, phone, name, _id } = editableData;
      setName(name);
      setAddress(custAddress);
      setPhone(phone);
      setDate(dueDate);
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    const { editableData } = props;

    const form = event.currentTarget;
    console.log(form, "Form");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const body = {
      name: name,
      custAddress: address,
      phone: phone,
      dueDate: startDate
    };
    const _id = JSON.parse(localStorage.getItem("user"))._id;
    let resp;
    if (!editableData) {
      resp = await Request.addOrder(_id, body);
    } else {
      resp = await Request.updateOrder({ _id: editableData._id, ...body });
    }
    console.log(resp, "NEWWW");
    if (!resp.error) {
      // const _id = resp.user._id;
      // props.history.push({
      //   pathname: `/${_id}`
      // });

      const { handleShow } = props;

      handleShow();
    }
    setValidated(true);
  };
  // const handleChangeDate = d => {
  //   setDate(d);
  // };
  return (
    <div className={styles.Card}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Buyer's Name"
              defaultValue={name}
              onBlur={e => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              defaultValue={address}
              placeholder="Address"
              onBlur={e => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Phone
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              defaultValue={phone}
              placeholder="Phone"
              onBlur={e => setPhone(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Date
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              defaultValue={startDate}
              placeholder="Date"
              onBlur={e => setDate(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" className="btn float-right">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(NewOrder);
