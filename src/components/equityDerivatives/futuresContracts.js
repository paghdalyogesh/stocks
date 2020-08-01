import React from "react";
import FuturesContractsData from './futuresContractsData';

const FuturesContracts = (props) => {
  const callPutData = props.callPutData;  
  if (callPutData) {
    return (
      <div className="rows">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th className="trendShow d-none text-center" colSpan="8">Trend</th>
              <th className="text-center" colSpan="8">CE</th>
              <th className="text-center">Strike</th>
              <th className="text-center" colSpan="8">PE</th>
              <th className="trendShow d-none text-center" colSpan="8">Trend</th>
            </tr>
            <tr>
              <th className="trendShow d-none">TREND</th>
              <th className="trendShow d-none">Interpretation</th>
              <th className="trendShow d-none">OI change</th>
              <th className="trendShow d-none">price change</th>
              <th className="trendShow d-none">VOLUME</th>
              <th className="trendShow d-none">OI</th>
              <th className="trendShow d-none">CHNG IN OI</th>
              <th className="trendShow d-none">CHNG</th>  
              <th>Rho</th>
              <th>Vega</th>
              <th>Gamma</th>
              <th>Theta</th>
              <th>Delta</th>
              <th>Call Price</th>
              <th>CE LTP</th>
              <th>CE IV</th>
              <th className="text-center">Price</th>
              <th>PE IV</th>
              <th>PE LTP</th>
              <th>Call Price</th>
              <th>Delta</th>
              <th>Theta</th>
              <th>Gamma</th>
              <th>Vega</th>
              <th>Rho</th>
              <th className="trendShow d-none">CHNG</th>
              <th className="trendShow d-none">CHNG IN OI</th>
              <th className="trendShow d-none">OI</th>
              <th className="trendShow d-none">VOLUME</th>
              <th className="trendShow d-none">price change</th>
              <th className="trendShow d-none">OI change</th>
              <th className="trendShow d-none">Interpretation</th>
              <th className="trendShow d-none">TREND</th>
            </tr>
          </thead>
          <tbody>
            {callPutData ? callPutData.map(data => (
              <FuturesContractsData key={data.strikePrice} item={data} />
            )) : ''}
          </tbody>
        </table>
      </div>
    );
  } else{
    return (
      <div className="card">loading</div>
    )   
  }
}

export default FuturesContracts;