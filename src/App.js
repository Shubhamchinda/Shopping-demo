import React from "react";
import { Route } from "react-router-dom";

import Main from "./container/Main";
import styles from "./App.css";

const App = () => {
  return (
    <div className={styles.App}>
      <Route path="/" component={Main} />
    </div>
  );
};

export default App;
