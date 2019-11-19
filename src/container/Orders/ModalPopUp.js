import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import NewOrderForm from "./newOrder";
import styles from './styles.css'

const ModalPopUp = props => {
  const [title, setTitle] = useState('Place New Order')
  const handleShow = () => {
    const { updateShow } = props;
    updateShow(false);
  };
  const { show, editData } = props;
  return (
    <div className={styles.Modal}>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewOrderForm handleShow={handleShow} editableData={editData && editData}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary " onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
