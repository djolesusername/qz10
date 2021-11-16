import React, { useEffect } from "react";
import "./App.css";
import { keepTheme } from "./themes";
import data from "./data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home";

function App() {
  useEffect(() => {
    keepTheme();
  }, []);
  return (
    <React.Fragment>
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="invoice-content">
          <Home data={data} />
        </div>
      </div>
      <Router>
        <Switch>
          <Route path="/:invoiceId" exact></Route>

          <Route path="/"></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
