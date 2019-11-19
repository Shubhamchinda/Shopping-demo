import React from "react";
import { Table, Button, Card, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import TableBody from "./TableBody";
import Request from "../../request";
import Modal from "./ModalPopUp";
import NavBar from "./../../components/Navbar";
import styles from "./styles.css";

class Orders extends React.Component {
  //   const [show, setShow] = useState(false);

  state = {
    show: false,
    tbody: [],
    editableData: null
  };

  async componentDidMount() {
    this.apiRequest();
  }
  newOrderhandler = () => {};

  apiRequest = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.props.history.push("/");
    } else {
      const resp = await Request.getUser(user._id);

      this.setState({
        tbody: resp.data.orders
      });
    }
  };

  handleShow = val => {
    if (!val) {
      this.setState({
        editableData: null
      });
    }
    this.setState(
      {
        show: val
      },
      () => {
        this.apiRequest();
      }
    );
  };

  handleOnLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  handleEditData = data => {
    this.setState({
      editableData: data
    });
  };

  handleDeleteOrder = async id => {
    const deleteResp = await Request.deleteOrder(id);
    if (!deleteResp.error) {
      this.apiRequest();
    }
  };

  render() {
    const { show, tbody, editableData } = this.state;
    return (
      <div>
        <NavBar onLogOut={this.handleOnLogOut} />
        <div className={styles.MainTable}>
          <Button
            type="primary"
            className={styles.NewOrder}
            onClick={() => this.handleShow(true)}
          >
            New Order
          </Button>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Number</th>
                <th>Order Due Date</th>
                <th>Buyer name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <TableBody
              tbody={tbody}
              updateShow={val => this.handleShow(val)}
              editData={data => this.handleEditData(data)}
              onDelete={this.handleDeleteOrder}
            />
          </Table>
          {show && (
            <Modal
              show={show}
              updateShow={val => this.handleShow(val)}
              editData={editableData}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Orders);
