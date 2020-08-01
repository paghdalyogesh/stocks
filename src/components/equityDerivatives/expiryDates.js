import React, { useState } from "react";

const ExpiryDates = (props) => {
  const [selectDate, setSelectDate] = useState(0);
  const [isToggle, setIsToggle] = useState(false);
  //const [selectOptions, setSelectOptions] = useState('NIFTY');
  const ExpDate = props.ExpDates;
  function handleClick(event) {
    setSelectDate(event.target.value);
    props.onChildClick(event.target.value);
  }
  /*function handleChange(event) {
    setSelectOptions(event.target.value);
    props.onChildChange(event.target.value);
  }*/
  function showTrend(event) {
    var a = !isToggle ? true : false;
    setIsToggle(a);
    if (isToggle) {
      document.querySelectorAll('.trendShow').forEach((el) => el.classList.add('d-none'));
    } else {
      document.querySelectorAll('.trendShow').forEach((el) => el.classList.remove('d-none'));
    }
  }

  //showTrend = event => event.target.classList.add('showTrend');

  let listItems;
  if (ExpDate) {
    listItems = <select className="form-control" value={selectDate} onChange={handleClick}>
      {ExpDate.map(expDate => (
        <option key={expDate} value={expDate}>
          {expDate}
        </option>
      ))}
    </select>
  }
  /*let listOption;
  let optionList = ["NIFTY", "BANKNIFTY", "ACC", "ADANIENT", "ADANIPORTS", "ADANIPOWER", "AMARAJABAT", "AMBUJACEM", "APOLLOHOSP", "APOLLOTYRE", "ASHOKLEY", "ASIANPAINT", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BAJAJFINSV", "BAJFINANCE", "BALKRISIND", "BANDHANBNK", "BANKBARODA", "BATAINDIA", "BEL", "BERGEPAINT", "BHARATFORG", "BHARTIARTL", "BHEL", "BIOCON", "BPCL", "BOSCHLTD", "BRITANNIA", "CADILAHC", "CANBK", "CENTURYTEX", "CESC", "CHOLAFIN", "CIPLA", "COALINDIA", "COLPAL", "CONCOR", "CUMMINSIND", "DABUR", "DIVISLAB", "DLF", "DRREDDY", "EICHERMOT", "EQUITAS", "ESCORTS", "EXIDEIND", "FEDERALBNK", "GAIL", "GLENMARK", "GMRINFRA", "GODREJCP", "GODREJPROP", "GRASIM", "HAVELLS", "HCLTECH", "HDFC", "HDFCBANK", "HDFCLIFE", "HEROMOTOCO", "HINDALCO", "HINDPETRO", "HINDUNILVR", "IBULHSGFIN", "ICICIBANK", "ICICIPRULI", "IDEA", "IDFCFIRSTB", "IGL", "INDIGO", "INDUSINDBK", "INFRATEL", "INFY", "IOC", "ITC", "JINDALSTEL", "JSWSTEEL", "JUBLFOOD", "JUSTDIAL", "KOTAKBANK", "L&TFH", "LICHSGFIN", "LT", "LUPIN", "M&M", "M&MFIN", "MANAPPURAM", "MARICO", "MARUTI", "MCDOWELL-N", "MFSL", "MGL", "MINDTREE", "MOTHERSUMI", "MRF", "MUTHOOTFIN", "NATIONALUM", "NAUKRI", "NCC", "NESTLEIND", "NIITTECH", "NMDC", "NTPC", "OIL", "ONGC", "PAGEIND", "PEL", "PETRONET", "PFC", "PIDILITIND", "PNB", "POWERGRID", "PVR", "RAMCOCEM", "RBLBANK", "RECLTD", "RELIANCE", "SAIL", "SBILIFE", "SBIN", "SHREECEM", "SIEMENS", "SRF", "SRTRANSFIN", "SUNPHARMA", "SUNTV", "TATACHEM", "TATACONSUM", "TATAMOTORS", "TATAPOWER", "TATASTEEL", "TCS", "TECHM", "TITAN", "TORNTPHARM", "TORNTPOWER", "TVSMOTOR", "UBL", "UJJIVAN", "ULTRACEMCO", "UPL", "VEDL", "VOLTAS", "WIPRO", "ZEEL"];
  if (optionList) {
    listOption = <select className="custom-select" value={selectOptions} onChange={handleChange}>
      {optionList.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  }*/

  return (
    <div className="rows">
      <div className="float-right">
        <form className="form-inline">
          {/* <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <label className="input-group-text">Options</label>
            </div>
            {listOption}
          </div> */}
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Expiry Date</div>
            </div>
            {listItems}
          </div>
          <div className="form-check mb-2 mr-sm-2">
            <label className="form-check-label">
              Underlying Index:  {props.selectOptions} {props.underlyingValue} As on {props.timeStamp}
            </label>
          </div>
          <div className="btn-group-toggle">
            <label className="btn btn-secondary active" onClick={showTrend}>
              {isToggle ? 'Remove' : 'Show'} Trend
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpiryDates;