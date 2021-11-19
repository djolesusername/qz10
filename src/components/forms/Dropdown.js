import React from "react";

const Dropdown = () => {
  return (
    <div>
      <label htmlFor="pterms">Payment terms</label>
      <select name="pterms" id="pterms">
        <option value="30">Net 30 Days</option>
        <option value="14">Net 14 Days</option>
        <option value="7">Net 7 Days</option>
        <option value="1">Net 1 days</option>
      </select>
    </div>
  );
};
export default Dropdown;
