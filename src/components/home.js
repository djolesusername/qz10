import React, { useState, useEffect } from "react";
import Invoice from "./invoices";
import Header from "./header/header";
import "./home.css";

const Home = (props) => {
  const [itemsToDisplay, setItemsToDisplay] = useState(props.data);
  useEffect(() => {
    setItemsToDisplay(props.data);
  }, [props.data]);

  const filterItems = (filteredArray) => {
    let filteredOptions = [];
    let updatedView = [];
    filteredArray.map((option) => filteredOptions.push(option.value));

    updatedView = props.data.filter((invoice) => filteredOptions.indexOf(invoice.status) !== -1);
    setItemsToDisplay(updatedView);
  };
  return (
    <div className="main-page-container">
      <div className="header-container">
        <Header filterItems={filterItems} invoices={props} />
      </div>
      <div className="invoice-list">
        {itemsToDisplay.map((data, key) => {
          return (
            <Invoice
              key={key}
              id={data.id}
              name={data.clientName}
              createdAt={data.createdAt}
              total={data.total}
              status={data.status}
              handleDelete={props.handleDelete}
              data={props.dataI}
              invoiceDue={data.paymentDue}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
