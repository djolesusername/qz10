import React, { useEffect } from "react";
import "./App.css";
import { keepTheme } from "./themes";
import data from "./data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home";
import InvoicePage from "./components/invoicePage";

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
          <Router>
            <Switch>
              <Route path="/:invoiceId" exact>
                <InvoicePage />
              </Route>

              <Route path="/">
                <Home data={data} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
