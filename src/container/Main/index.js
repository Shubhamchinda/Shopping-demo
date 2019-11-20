import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";


import SignIn from "./../SignIn";
import SignUp from "./../SignUp";
import Orders from "./../Orders";
import styles from "./styles.css";

function Main() {
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = (val) => {
    setSignUp(val)
  }
  useEffect(() => {
  localStorage.clear()    
  }, [])

  let mainComp = <SignIn />;
  if (signUp) {
    mainComp = <SignUp />;
  }
  return (
    <>
      <Route path="/" exact component={() => mainComp} />
      <Route path="/orders" exact component={() => <Orders />} />
      {!signUp && !localStorage.getItem('user') &&(
        <div className={styles.Footer}>
          <p>Don't have an account ?</p>
          <Button className="btn btn-secondary" onClick={() => handleSignUp(true)}> Sign Up</Button>
        </div>
      )}
      {signUp && !localStorage.getItem('user') && (
        <div className={styles.Footer}>
          <p>Already have an account ?</p>
          <Button className="btn btn-secondary" onClick={() => handleSignUp(false)}> Log In</Button>
        </div>
      )}
    </>
  );
}

export default withRouter(Main);
