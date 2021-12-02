import React from "react";
import "./itemList.css";
import plusSign from "../../assets/icon-plus.svg";
import deleteSign from "../../assets/icon-delete.svg";

const ItemList = (props) => {
  const addItem = (e) => {
    e.preventDefault();
    const newItem = { id: Math.random(), name: "", quantity: 1, price: 1 };
    let newState = [...props.itemList, newItem];
    props.setItemList(newState);
  };
  const removeItem = (e) => {
    e.preventDefault();
    let newState = props.itemList.filter((item) => item.id !== parseFloat(e.target.id));
    props.setItemList(newState);
  };

  const editItem = (e) => {
    console.log(e.target.value);
    let inputEntry = e.target.id.split("+")[0]; //id
    let inputProperty = e.target.id.split("+")[1].replace(/[^a-z0-9-]/g, ""); //property changed

    for (let i = 0; i < props.itemList.length; i++) {
      if (props.itemList[i].id === parseFloat(inputEntry)) {
        let newState = [...props.itemList];
        newState[i][inputProperty] = e.target.value;
        props.setItemList(newState);
        console.log(props.itemList);
        return props.itemList;
      }
    }
  };

  return (
    <div className="item-list">
      <div className="grid1outof5">
        <div className="">Item Name </div>
        <div className=""> Qty.</div>
        <div className=""> Price</div>
        <div className=""> Total</div>

        <div className=""> </div>
      </div>
      {Array.from(props.itemList).map((item, key) => {
        return (
          <div className="grid1outof5" key={key}>
            <input
              key={`${item.id}+"name"`}
              id={`${item.id}+"name"`}
              className="name {item.id} {key}"
              defaultValue={item.name}
              onInput={editItem}
            />
            <input
              type="number"
              pattern="[0-9]*"
              id={`${item.id}+"price"`}
              key={`${item.id}+"price"`}
              className="price {item.id} {key}"
              onInput={editItem}
              defaultValue={item.quantity}
            />
            <input
              type="number"
              key={`${item.id}+"quantity"`}
              pattern="[0-9]*"
              id={`${item.id}+"quantity"`}
              onInput={editItem}
              className="quantity {item.id} key"
              defaultValue={parseFloat(item.price).toFixed(2)}
            />
            <span className="total-row"> {parseFloat(item.quantity * item.price).toFixed(2)}</span>
            <input
              type="image"
              src={deleteSign}
              alt="delete"
              className="button-remove"
              key={`${item.id}+"button"`}
              id={item.id}
              onClick={removeItem}
            />
          </div>
        );
      })}
      <div className="newItemButton" onClick={addItem}>
        <img src={plusSign} alt="new item" />
        <span> Add New item </span>
      </div>{" "}
    </div>
  );
};
export default ItemList;
