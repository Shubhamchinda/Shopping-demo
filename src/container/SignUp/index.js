import React, { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import styles from "./styles.css";
import Request from "../../request";
import ToastAlert from "../../components/Toast";

const SignUp = props => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [toast, setToast] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form, "Form");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const body = {
      name: name,
      email: email,
      password: password
    };

    const resp = await Request.signUp(body);
    console.log(resp);
    if (!resp.error) {
      props.history.push({
        pathname: `/`
      });
      setAlert(false);
    } else {
      setAlert(true);
      let data = {
        ...resp,
        show: alert
      };
      setToast(<ToastAlert {...data} />);
      setAlert(false);
    }
    setValidated(true);
  };
  return (
    <>
      {/* {toast} */}
      <div className={styles.Card}>
        <Card className="text-center">
          <Card.Header>Register</Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onBlur={e => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onBlur={e => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onBlur={e => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default withRouter(SignUp);
