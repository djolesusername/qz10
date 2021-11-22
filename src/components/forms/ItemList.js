import React from "react";

const ItemList = (props) => {
  const addItem = () => {
    const newItem = { id: Math.random(), "description: ": "", quantity: "", price: "" };
    let newState = [...props.itemList, newItem];
    props.setItemList(newState);
  };
  const removeItem = (e) => {
    let newState = props.itemList.filter((item) => item.id !== parseFloat(e.target.id));
    props.setItemList(newState);
  };

  const editItem = (e) => {
    console.log(e.target.value);
    let inputEntry = e.target.id.split("+")[0]; //id
    let inputProperty = e.target.id.split("+")[1]; //property changed

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
    <div>
      <button onClick={addItem}>Add item </button>
      {Array.from(props.itemList).map((item, key) => {
        return (
          <div key={key}>
            <input
              key={`${item.id}+"description"`}
              id={`${item.id}+"description"`}
              className="description {item.id} {key}"
              defaultValue={item.description}
              onInput={editItem}
            />
            <input
              type="number"
              pattern="[0-9]*"
              key={`${item.id}+"price"`}
              className="price {item.id} {key}"
              onInput={editItem}
              defaultValue={item.Quantity}
            />
            <input
              type="number"
              key={`${item.id}+"quantity"`}
              pattern="[0-9]*"
              onInput={editItem}
              className="quantity {item.id} key"
              defaultValue={item.price}
            />
            <button key={`${item.id}+"button"`} id={item.id} onClick={removeItem}>
              remove item{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ItemList;
