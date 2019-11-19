import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

import { Form, Button, Nav } from "react-bootstrap";

export default class NavBar extends Component {
  handleLogOut = () => {
    const { onLogOut } = this.props;
    onLogOut && onLogOut();
  };
  render() {
    return (
      <div>
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">React App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#">Orders</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-info" onClick={this.handleLogOut}>
                Log Out
              </Button>
            </Form>
          </Navbar>
          <br />
        </>
      </div>
    );
  }
}
