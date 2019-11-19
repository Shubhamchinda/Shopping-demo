import React, { useState } from "react";
import { Row, Col, Toast } from "react-bootstrap";

const ToastAlert = props => {
  const [show, setShow] = useState(true);

  const { message, error, success } = props;
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Toast onClose={() => setShow(false)} show={show} delay={500} autohide>
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            /> */}
            <strong className="mr-auto">{error}</strong>
            <small>{success}</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default ToastAlert;
