import React, { useState } from "react";
import GreekCalculator from '../../commonFunction/greekCalculator';
//import Debounce from '../../commonFunction/debounce';

const StrategyBuilderCustom = (props) => {
  const callPutData = props.callPutData ? props.callPutData[props.option] : 0;
  const [stockPrice, setStockPrice] = useState(0);
  const [minStockPrice, setMinStockPrice] = useState(0);
  const [maxStockPrice, setMaxStockPrice] = useState(0);

  const [expiryDate, setExpiryDate] = useState(0);
  const [expiryDay, setExpiryDay] = useState(0);
  const [expiryCountDay, setExpiryCountDay] = useState(0);
  const [maxExpiryDay, setMaxExpiryDay] = useState(0);

  const [impliedVolatility, setImpliedVolatility] = useState(0);
  const [greekValue, setGreekValue] = useState(0);
  if (callPutData.underlyingValue && stockPrice === 0) {
    setStockPrice(callPutData.underlyingValue);
    let a = (parseInt(callPutData.underlyingValue) - parseInt(callPutData.underlyingValue) * 10 / 100);
    let b = (parseInt(callPutData.underlyingValue) + parseInt(callPutData.underlyingValue) * 10 / 100);
    setMinStockPrice(a);
    setMaxStockPrice(b);

    setExpiryDate(new Date().toLocaleDateString());
    setExpiryDay(dayDiff(callPutData.expiryDate));
    setMaxExpiryDay(dayDiff(callPutData.expiryDate));

    setImpliedVolatility(callPutData.impliedVolatility);

    //greekCalc();
    setGreekValue(GreekCalculator(callPutData.underlyingValue, callPutData.strikePrice, callPutData.expiryDate, callPutData.impliedVolatility, props.option));
    //setGreekValue(GreekCalculator(callPutData, "CE"));
  }

  function changeTargetDate(event) {
    setExpiryDay(maxExpiryDay - parseInt(event.target.value));
    setExpiryCountDay(parseInt(event.target.value));
    let today = new Date();
    let targetDate = today.setDate(today.getDate() + parseInt(event.target.value));
    setExpiryDate(new Date(targetDate).toLocaleDateString());
  }
  function dayDiff(exDate) {
    let today = new Date();
    let extoday = new Date(exDate);
    let timeDiff = Math.abs(extoday.getTime() - today.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  function greekCalc(){
    setGreekValue(GreekCalculator(stockPrice, callPutData.strikePrice, expiryDate, impliedVolatility, props.option));
  } 
 
  let listItems;
  if (greekValue) {
    listItems = <ul className="list-group">
       <li className="list-group-item active">Greek Calculator</li>
       <li className="list-group-item">Call Price: <span className="badge badge-primary badge-pill">{greekValue.callPrice}</span></li>
       <li className="list-group-item">Delta:  <span className="badge badge-primary badge-pill">{greekValue.delta}</span></li>
       <li className="list-group-item">Theta: <span className="badge badge-primary badge-pill">{greekValue.theta}</span></li>
       <li className="list-group-item">Gamma: <span className="badge badge-primary badge-pill">{greekValue.gamma}</span></li>
       <li className="list-group-item">Vega: <span className="badge badge-primary badge-pill">{greekValue.vega}</span></li>
       <li className="list-group-item">Rho: <span className="badge badge-primary badge-pill">{greekValue.rho}</span></li>
    </ul>
  }

  return (
    <div className="row">
      <div className="col-8">
        <div className="card">
        <form className="needs-validation p-4">
          <div className="form-group row">
            <label className="col-5 col-form-label col-form-label-sm">Price : </label>
            <div className="col-6">
              <input type="input" className="form-control form-control-sm" placeholder={stockPrice} disabled onKeyUp={event => setStockPrice(event.target.value)} />
              <input type="range" min={minStockPrice} max={maxStockPrice} value={stockPrice} className="slider col-12" onChange={event => setStockPrice(event.target.value)} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-5 col-form-label col-form-label-sm">Target Date: {expiryDay} Days</label>
            <div className="col-6">
              <input type="input" className="form-control form-control-sm" placeholder={expiryDate} disabled />
              <input type="range" min="0" max={maxExpiryDay} value={expiryCountDay} className="slider col-12" onChange={changeTargetDate} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-5 col-form-label col-form-label-sm">IV (Implied volatility):</label>
            <div className="col-6">
              <input type="number" className="form-control form-control-sm" placeholder={impliedVolatility} disabled onKeyPress={event => setImpliedVolatility(event.target.value)} />
              <input type="range" min="1" max="100" value={impliedVolatility} className="slider col-12" onChange={event => setImpliedVolatility(event.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={greekCalc} type="button">Greek calculator </button>
        </form>
      </div></div>
      <div className="col-4">
      <div className="card">
        {listItems}
      </div>
    </div>
    </div>
  );
}

export default StrategyBuilderCustom;