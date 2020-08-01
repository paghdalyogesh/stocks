import React from "react";

const FuturesContractsData = (props) => {
  const item = props.item;
  const underlyingValue = props.underlyingValue;
  let dataTableView;
  function NORMSDIST(z) {
    let b1 = 0.31938153;
    let b2 = -0.356563782;
    let b3 = 1.781477937;
    let b4 = -1.821255978;
    let b5 = 1.330274429;
    let p = 0.2316419;
    let c2 = 0.3989423;
    let a = Math.abs(z);
    if (a > 6.0) { return 1.0; }
    let t = 1.0 / (1.0 + a * p);
    let b = c2 * Math.exp((-z) * (z / 2.0));
    let n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    n = 1.0 - b * n;
    if (z < 0.0) { n = 1.0 - n; }
    return n;
  }
  function dayDiff(exDate) {
    var today = new Date();
    var Extoday = new Date(exDate);
    var timeDiff = Math.abs(Extoday.getTime() - today.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  function probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, optionPriceCE, IVCE, option) {
    var R = noriskInterestRate / 100; //R : risk free rate of interest
    var V = IVCE / 100; //o : Call volatility
    var T = timeToMaturity / 365;  //T-t : time to expiration
    var D = 0 / 100;  //D - dividend yield

    var callPrice, delta, theta, gamma, vega, rho
    if (option === 'CE') {
      var CeD1 = ((Math.log(stockPrics / strikePrice)) + (((R - D) + (Math.pow(V, 2) / 2)) * T)) / (V * Math.sqrt(T));
      var CeD2 = ((Math.log(stockPrics / strikePrice)) + (((R - D) - (Math.pow(V, 2) / 2)) * T)) / (V * Math.sqrt(T));
      var D1NORMSDIST = NORMSDIST(CeD1);
      var D2NORMSDIST = NORMSDIST(CeD2);
      callPrice = ((stockPrics * Math.exp(((-1 * D) * T))) * D1NORMSDIST) - ((strikePrice * Math.exp(((-1 * R) * T))) * D2NORMSDIST);
      delta = Math.exp(((-1 * D) * T)) * D1NORMSDIST;
      theta = ((((-1 * ((((stockPrics * ((1 / Math.sqrt((2 * 3.14159))) * Math.exp(((-1 * Math.pow(CeD1, 2)) / 2)))) * V) * Math.exp(((-1 * T) * D))) / (2 * Math.sqrt(T)))) + ((D * stockPrics) * delta)) - (((R * strikePrice) * Math.exp(((-1 * R) * T))) * NORMSDIST(CeD2)))) / 365;
      gamma = ((((1 / Math.sqrt((2 * 3.14159)) * Math.exp(((-1 * Math.pow(CeD1, 2)) / 2))) * Math.exp(((-1 * T) * D))) / ((stockPrics * V) * Math.sqrt(T))));
      vega = (((((1 / Math.sqrt((2 * 3.14159))) * Math.exp(((-1 * Math.pow(CeD1, 2)) / 2))) * Math.exp(((-1 * T) * D))) * stockPrics) * Math.sqrt(T)) / 100;
      rho = ((((strikePrice * T) * Math.exp(((-1 * R) * T))) * D2NORMSDIST) * Math.exp(((-1 * D) * T))) / 100;
    } else {
      var PeD1 = ((Math.log(stockPrics / strikePrice)) + (((R - D) + (Math.pow(V, 2) / 2)) * T)) / (V * Math.sqrt(T));
      var PeD2 = ((Math.log(stockPrics / strikePrice)) + (((R - D) - (Math.pow(V, 2) / 2)) * T)) / (V * Math.sqrt(T));
      callPrice = ((strikePrice * Math.exp(((-1 * R) * T))) * NORMSDIST((-1 * PeD2))) - ((stockPrics * Math.exp(((-1 * D) * T))) * NORMSDIST(-1 * PeD1));
      delta = Math.exp(((-1 * D) * T)) * ((NORMSDIST(PeD1)) - 1);
      theta = (((((-1 * ((((stockPrics * ((1 / Math.sqrt((2 * 3.14159))) * Math.exp(((-1 * Math.pow(PeD1, 2)) / 2)))) * V) * Math.exp(((-1 * T) * D))))) / (2 * Math.sqrt(T))) - (((D * stockPrics) * NORMSDIST((-1 * PeD1))) * Math.exp(((-1 * T) * D)))) + (((R * strikePrice) * Math.exp(((-1 * R) * T))) * NORMSDIST((-1 * PeD2))))) / 365;
      gamma = ((((1 / Math.sqrt((2 * 3.14159)) * Math.exp(((-1 * Math.pow(PeD1, 2)) / 2))) * Math.exp(((-1 * T) * D))) / ((stockPrics * V) * Math.sqrt(T))));
      vega = (((((1 / Math.sqrt((2 * 3.14159))) * Math.exp(((-1 * Math.pow(PeD1, 2)) / 2))) * Math.exp(((-1 * T) * D))) * stockPrics) * Math.sqrt(T)) / 100;
      rho = (((((-1 * strikePrice) * T) * Math.exp(((-1 * R) * T))) * NORMSDIST((-1 * PeD2))) * Math.exp(((-1 * D) * T))) / 100;
    }
    var greek = {
      R: R.toFixed(2),
      V: V.toFixed(2),
      T: T.toFixed(2),
      D: D.toFixed(2),
      callPrice: callPrice.toFixed(2),
      delta: delta.toFixed(2),
      theta: theta.toFixed(2),
      gamma: gamma.toFixed(2),
      vega: vega.toFixed(2),
      rho: rho.toFixed(2)
    }
    return greek;
  }
  function greekOption(data, option) {
    if (data && data.strikePrice && data.impliedVolatility && data.lastPrice) {
      //console.log(data.expiryDate);
      var stockPrics = underlyingValue;
      var strikePrice = data.strikePrice;
      var noriskInterestRate = 6.5;
      var timeToMaturity = dayDiff(data.expiryDate);
      //console.log("timeToMaturity ->" + timeToMaturity);
      var optionPriceCE = data.lastPrice;
      var IVCE = data.impliedVolatility;
      if (data.lastPrice > 0) {
        return probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, optionPriceCE, IVCE, option);
      }
    } else {
      var greek = {
        callPrice: 0,
        delta: 0,
        theta: 0,
        gamma: 0,
        vega: 0,
        rho: 0
      }
      return greek;
    }
  }

  if (item) {
    console.log(item);
    if (item && item.CE && item.PE) {
      let dataCE = greekOption(item.CE, 'CE');
      let dataPE = greekOption(item.PE, 'PE');
      console.log("====" + item.strikePrice + "====")
      console.log(dataCE);
      console.log(dataCE);
      if (item.CE.lastPrice > 1 && item.PE.lastPrice > 1) {
        dataTableView = <tr key={item.strikePrice}>
          <td>
            {(item.CE.change < 0 && item.CE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest > 0) ? 'BULLISH' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.CE.change < 0 && item.CE.changeinOpenInterest > 0) ? 'BEARISH' : ''}
          </td>
          <td>
            {(item.CE.change < 0 && item.CE.changeinOpenInterest < 0) ? 'Long Liquidation' : ''}
            {(item.CE.change < 0 && item.CE.changeinOpenInterest > 0) ? 'Short Buildup' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest > 0) ? 'Long Buildup' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest < 0) ? 'Short covering' : ''}
          </td>

          <td>{item.CE.changeinOpenInterest > 0 ? 'UP' : 'DOWN'}</td>
          <td>{item.CE.change > 0 ? 'UP' : 'DOWN'}</td>
          <td>{item.CE.totalTradedVolume}</td>
          <td>{item.CE.openInterest}</td>
          <td>{item.CE.changeinOpenInterest}</td>
          <td>{item.CE.change.toFixed(2)}</td>

          <td>{dataCE.rho}</td>
          <td>{dataCE.vega}</td>
          <td>{dataCE.gamma}</td>
          <td>{dataCE.theta}</td>
          <td>{dataCE.delta}</td>
          <td>{dataCE.callPrice}</td>

          <td>{item.CE.lastPrice}</td>
          <td>{item.CE.impliedVolatility}</td>
          <th>{item.strikePrice}</th>
          <td>{item.PE.impliedVolatility}</td>
          <td>{item.PE.lastPrice}</td>

          <td>{dataPE.callPrice}</td>
          <td>{dataPE.delta}</td>
          <td>{dataPE.theta}</td>
          <td>{dataPE.gamma}</td>
          <td>{dataPE.vega}</td>
          <td>{dataPE.rho}</td>

          <td>{item.PE.change.toFixed(2)}</td>
          <td>{item.PE.changeinOpenInterest}</td>
          <td>{item.PE.openInterest}</td>
          <td>{item.PE.totalTradedVolume}</td>
          <td>{item.PE.change > 0 ? 'UP' : 'DOWN'}</td>
          <td>{item.PE.changeinOpenInterest > 0 ? 'UP' : 'DOWN'}</td>
          <td>
            {(item.PE.change < 0 && item.PE.changeinOpenInterest < 0) ? 'Long Liquidation' : ''}
            {(item.PE.change < 0 && item.PE.changeinOpenInterest > 0) ? 'Short Buildup' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest > 0) ? 'Long Buildup' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest < 0) ? 'Short covering' : ''}
          </td>
          <td>
            {(item.PE.change < 0 && item.PE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest > 0) ? 'BULLISH' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.PE.change < 0 && item.PE.changeinOpenInterest > 0) ? 'BEARISH' : ''}
          </td>
        </tr>
      }
    }
  }
  return (
    <tbody>
      {dataTableView}
    </tbody>
  );
}

export default FuturesContractsData;