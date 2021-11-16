import React from "react";
import Invoice from "./invoices";
import Header from "./header/header";
import "./home.css";

const Home = (props) => {
  return (
    <div className="main-page-container">
      <div className="header-container">
        <Header invoices={props} />
      </div>
      <div className="invoice-list">
        {props.data.map((data, key) => {
          return (
            <Invoice key={key} id={data.id} name={data.clientName} createdAt={data.createdAt} total={data.total} status={data.status} />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
