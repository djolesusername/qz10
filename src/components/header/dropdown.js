import React from "react";
import Select from "react-dropdown-select";
import styled from "@emotion/styled";
import "./dropdown.css";

const ItemRenderer = (props) => {
  const options = [
    { value: "paid", label: "Paid" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <React.Fragment>
      <Select
        multi
        options={options}
        values={[...options]}
        placeholder="Filter by status"
        onChange={(values) => props.filterItems(values)}
        itemRenderer={({ item, methods }) => (
          <StyledItem>
            {item.disabled ? (
              <div aria-disabled>{item.label}</div>
            ) : (
              <div onClick={() => methods.addItem(item)}>
                <input onChange={() => methods.addItem(item)} type="checkbox" checked={methods.isSelected(item)} /> {item.label}
              </div>
            )}
          </StyledItem>
        )}
      />
    </React.Fragment>
  );
};
ItemRenderer.propTypes = {};

const StyledItem = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
  }
  input {
    margin-right: 10px;
  }
  :hover {
    background: #f2f2f2;
  }
`;

export default ItemRenderer;
