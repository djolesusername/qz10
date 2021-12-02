import React from "react";
import Invoice from "./invoices";
import Header from "./header/header";
import "./home.css";
import { DataContext } from "../shared/context";
import { useContext } from "react/cjs/react.development";

const Home = (props) => {
  const { dataI } = useContext(DataContext);
  return (
    <div className="main-page-container">
      <div className="header-container">
        <Header invoices={props} />
      </div>
      <div className="invoice-list">
        {props.data.map((data, key) => {
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
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
