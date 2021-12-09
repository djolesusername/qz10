import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { keepTheme } from "./themes";
import data from "./data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home";
import InvoicePage from "./components/invoicePage";
import { DataContext } from "./shared/context";

function App() {
  const [dataI, setDataI] = useState([...data]);

  useEffect(() => {
    keepTheme();
    let storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      setDataI(storedData);
    }
  }, []);

  const handleDelete = useCallback(
    (e) => {
      let id = e.target.id;
      const current = [...dataI];
      const newStateI = current.filter((invoice) => invoice.id !== id);
      setDataI(newStateI);
      localStorage.setItem("data", JSON.stringify(newStateI));
    },
    [dataI]
  );
  const handleToPaid = useCallback((dataI, invoicePaid) => {
    const current = [...dataI];
    const changedInvoice = { ...invoicePaid[0], status: "paid" };
    const newStateI = current.filter((invoice) => invoice.id !== changedInvoice.id);
    newStateI[newStateI.length] = changedInvoice;
    setDataI(newStateI);
    localStorage.setItem("data", JSON.stringify(newStateI));
  }, []);

  const handleUpdate = useCallback(
    (e, itemList, status) => {
      let results = 0;
      itemList.forEach((a) => (results += parseFloat(a.price) * parseFloat(a.quantity)));

      const current = [...dataI];
      const editedInvoice = {
        id: e.inputs.id.value,
        createdAt: e.inputs.invoiceDate.value,
        paymentDue: e.inputs.invoiceDate.value + Number(e.inputs.pterms.value) * 86400000,
        description: e.inputs.projectDesc.value,
        paymentTerms: e.inputs.pterms.value,
        clientName: e.inputs.btName.value,
        clientEmail: e.inputs.btEmail.value,
        status,
        senderAddress: {
          street: e.inputs.bfStreetAddress.value,
          city: e.inputs.bfCity.value,
          postCode: e.inputs.bfPostCode.value,
          country: e.inputs.bfCountry.value,
        },
        clientAddress: {
          street: e.inputs.btStreet.value,
          city: e.inputs.btCity.value,
          postCode: e.inputs.btPostCode.value,
          country: e.inputs.btCountry.value,
        },
        items: [...itemList],
        total: results,
      };
      const newStateI = current.filter((invoice) => invoice.id !== e.inputs.id.value);
      newStateI[newStateI.length] = editedInvoice;

      localStorage.setItem("data", JSON.stringify(newStateI));
      setDataI(newStateI);
    },
    [dataI]
  );

  const handleAdd = useCallback(
    (e, details, status) => {
      let results = 0;
      console.log(e);
      details.forEach((a) => (results += parseFloat(a.price) * parseFloat(a.quantity)));

      const newInvoice = {
        id: e.inputs.btName.value[0] + e.inputs.btName.value[1] + Math.round(Math.random() * 10000).toString(),
        createdAt: e.inputs.invoiceDate.value,
        paymentDue: e.inputs.invoiceDate.value + Number(e.inputs.pterms.value) * 86400000,
        description: e.inputs.projectDesc.value,
        paymentTerms: e.inputs.pterms.value,
        clientName: e.inputs.btName.value,
        clientEmail: e.inputs.btEmail.value,
        status: status,
        senderAddress: {
          street: e.inputs.bfStreetAddress.value,
          city: e.inputs.bfCity.value,
          postCode: e.inputs.bfPostCode.value,
          country: e.inputs.bfCountry.value,
        },
        clientAddress: {
          street: e.inputs.btStreet.value,
          city: e.inputs.btCity.value,
          postCode: e.inputs.btPostCode.value,
          country: e.inputs.btCountry.value,
        },
        items: [...details],
        total: results,
      };

      const current = [...dataI];
      current[current.length] = newInvoice;

      localStorage.setItem("data", JSON.stringify(current));
      setDataI(current);
    },
    [dataI]
  );
  return (
    <React.Fragment>
      <DataContext.Provider
        value={{ dataI: dataI, handleAdd: handleAdd, handleDelete: handleDelete, handleUpdate: handleUpdate, handleToPaid: handleToPaid }}
      >
        <div className="content">
          <div className="sidebar">
            <Sidebar />
          </div>

          <div className="invoice-content">
            <Router>
              <Switch>
                <Route path="/:invoiceId" exact>
                  <InvoicePage data={dataI} />
                </Route>

                <Route path="/">
                  <Home data={dataI} handleDelete={handleDelete} />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </DataContext.Provider>
    </React.Fragment>
  );
}

export default App;
