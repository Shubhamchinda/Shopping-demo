import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {} from "react-router";

import styles from "./styles.css";
import Request from "../../request";
import ToastAlert from "./../../components/Toast";

const SignIn = props => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [toast, setToast] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    console.log(props);
  }, []);

  let temp;
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const body = {
      email: email,
      password: password
    };
    const resp = await Request.login(body);
    console.log(resp);
    if (!resp.error) {
      const _id = resp.user._id;

      setAlert(false);

      localStorage.setItem("user", JSON.stringify(resp.user));

      props.history.push({
        pathname: `/orders`,
        user: resp.user
      });
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
      {toast}
      <div className={styles.Card}>
        <Card className="text-center">
          <Card.Header>Log In</Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default withRouter(SignIn);
