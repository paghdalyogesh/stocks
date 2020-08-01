import React, { useState } from "react";

const FuturesContractsFilter = (props) => {
  const [selectDate, setSelectDate] = useState(0);
  //const ExpDate = props.ExpDates;
  function handleClick(event) {
    setSelectDate(event.target.value);
    props.onChildClick(event.target.value);
  }

  let ExpDate = [{
    menu: "trend show",
    select: false
  },
  {
    menu: "ce show",
    select: false
  },
  {
    menu: "pe show",
    select: false
  }];
  let listItems;
  if (ExpDate) {
    listItems = <div className="btn-group btn-group-toggle">
      {ExpDate.map(expDate => (
        <label className="btn btn-secondary active">
          <input type="radio" name="options" id="option1" autocomplete="off" checked />  {expDate.menu}
        </label>
      ))}
    </div>
  }
  return (
    <div className="rows">
      <div className="text-center cards py-4">
        {listItems}
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active">
            <input type="radio" name="options" id="option1" autocomplete="off" checked />  Show Trend
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="options" id="option2" autocomplete="off" /> Only CE
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="options" id="option3" autocomplete="off" />  Only PE
          </label>
        </div>
      </div>
    </div>
  );
}

export default FuturesContractsFilter;