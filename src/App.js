import React, { useEffect } from "react";
import "./App.css";
import { keepTheme } from "./themes";
import data from "./data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./sidebar";

function App() {
  useEffect(() => {
    keepTheme();
    data.map((data) => {
      console.log(data);
      return 1;
    });
  }, []);
  return (
    <React.Fragment>
      <Sidebar />

      <Router>
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
