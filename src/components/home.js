import React, { useState } from "react";
import Invoice from "./invoices";
import Header from "./header/header";
import "./home.css";

const Home = (props) => {
  const [itemsToDisplay, setItemsToDisplay] = useState(props.data);
  const filterItems = (filteredArray) => {
    console.log("in filterItem");
    let updatedView = itemsToDisplay.filter((invoice) => invoice.status.indexof(filteredArray) !== -1);
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
