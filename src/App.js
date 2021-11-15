import React, { useEffect } from "react";
import "./App.css";
import { keepTheme } from "./themes";
import data from "./data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./sidebar";
import Content from "./content";

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
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Content />
      </div>
      <Router>
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
