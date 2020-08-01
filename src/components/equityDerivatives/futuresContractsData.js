import React from "react";
import { Link } from "react-router-dom";

const FuturesContractsData = (props) => {
  const item = props.item;
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
      var stockPrics = data.underlyingValue;
      var strikePrice = data.strikePrice;
      var noriskInterestRate = 6.5;
      var timeToMaturity = dayDiff(data.expiryDate);
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
    if ((item.CE && item.CE.lastPrice > 1) || (item.PE && item.PE.lastPrice > 1)) {
      let dataCeHtml;
      let dataPeHtml;
      if (item.CE && item.CE.lastPrice) {
        let dataCE = greekOption(item.CE, 'CE');
        let inTheMoneyCe = (item.CE.strikePrice < item.CE.underlyingValue ? 'bgMoccasin' : '');
        dataCeHtml = <React.Fragment>
            <td className="trendShow d-none {inTheMoneyCe}">
            {(item.CE.change < 0 && item.CE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest > 0) ? 'BULLISH' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.CE.change < 0 && item.CE.changeinOpenInterest > 0) ? 'BEARISH' : ''}
          </td>
          <td className="trendShow d-none {inTheMoneyCe}">
            {(item.CE.change < 0 && item.CE.changeinOpenInterest < 0) ? 'Long Liquidation' : ''}
            {(item.CE.change < 0 && item.CE.changeinOpenInterest > 0) ? 'Short Buildup' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest > 0) ? 'Long Buildup' : ''}
            {(item.CE.change > 0 && item.CE.changeinOpenInterest < 0) ? 'Short covering' : ''}
          </td>

          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.changeinOpenInterest > 0 ? 'UP' : 'DOWN'}</td>
          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.change > 0 ? 'UP' : 'DOWN'}</td>
          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.totalTradedVolume}</td>
          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.openInterest}</td>
          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.changeinOpenInterest}</td>
          <td className="trendShow d-none {inTheMoneyCe}">{item.CE.change.toFixed(2)}</td>

          <td className={inTheMoneyCe}>{dataCE.rho}</td>
          <td className={inTheMoneyCe}>{dataCE.vega}</td>
          <td className={inTheMoneyCe}>{dataCE.gamma}</td>
          <td className={inTheMoneyCe}>{dataCE.theta}</td>
          <td className={inTheMoneyCe}>{dataCE.delta}</td>
          <td className={inTheMoneyCe}>{dataCE.callPrice}</td>

          <td className={inTheMoneyCe}><Link to={'/strategy-builder/'+item.CE.strikePrice+'/CE/'+ item.CE.expiryDate}>{item.CE.lastPrice}</Link></td>
          <td className={inTheMoneyCe}><Link to={'/strategy-builder/'+item.CE.strikePrice+'/CE/'+ item.CE.expiryDate}>{item.CE.impliedVolatility}</Link></td>
        </React.Fragment>
      } else {
        //let inTheMoneyCe = (item.CE.strikePrice < item.CE.underlyingValue ? 'bgMoccasin' : '');
        dataCeHtml = <React.Fragment><th className="trendShow d-none" colSpan="8"></th><th colSpan="8"></th></React.Fragment>;
      }
      if (item.PE && item.PE.lastPrice > 1) {
        let inTheMoneyPe = (item.PE.strikePrice > item.PE.underlyingValue ? 'bgMoccasin' : '');
        let dataPE = greekOption(item.PE, 'PE');
        dataPeHtml = <React.Fragment>
          <td className={inTheMoneyPe}><Link to={'/strategy-builder/'+item.PE.strikePrice+'/PE/'+ item.PE.expiryDate}>{item.PE.impliedVolatility}</Link></td>
          <td className={inTheMoneyPe}><Link to={'/strategy-builder/'+item.PE.strikePrice+'/PE/'+ item.PE.expiryDate}>{item.PE.lastPrice}</Link></td>

          <td className={inTheMoneyPe}>{dataPE.callPrice}</td>
          <td className={inTheMoneyPe}>{dataPE.delta}</td>
          <td className={inTheMoneyPe}>{dataPE.theta}</td>
          <td className={inTheMoneyPe}>{dataPE.gamma}</td>
          <td className={inTheMoneyPe}>{dataPE.vega}</td>
          <td className={inTheMoneyPe}>{dataPE.rho}</td>

          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.change.toFixed(2)}</td>
          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.changeinOpenInterest}</td>
          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.openInterest}</td>
          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.totalTradedVolume}</td>
          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.change > 0 ? 'UP' : 'DOWN'}</td>
          <td className="trendShow d-none {inTheMoneyPe}">{item.PE.changeinOpenInterest > 0 ? 'UP' : 'DOWN'}</td>
          <td className="trendShow d-none {inTheMoneyPe}">
            {(item.PE.change < 0 && item.PE.changeinOpenInterest < 0) ? 'Long Liquidation' : ''}
            {(item.PE.change < 0 && item.PE.changeinOpenInterest > 0) ? 'Short Buildup' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest > 0) ? 'Long Buildup' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest < 0) ? 'Short covering' : ''}
          </td>
          <td className="trendShow d-none {inTheMoneyPe}">
            {(item.PE.change < 0 && item.PE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest > 0) ? 'BULLISH' : ''}
            {(item.PE.change > 0 && item.PE.changeinOpenInterest < 0) ? 'BULLISH' : ''}
            {(item.PE.change < 0 && item.PE.changeinOpenInterest > 0) ? 'BEARISH' : ''}
          </td>
        </React.Fragment>
      } else {
        dataPeHtml = <React.Fragment><th className="trendShow d-none" colSpan="8"></th><th colSpan="8"></th></React.Fragment>;
      }
      dataTableView = <tr key={item.strikePrice}>
        {dataCeHtml}
        <th className="text-center">{item.strikePrice}</th>
        {dataPeHtml}
      </tr>
    }
  }
  return (
    <React.Fragment>
      {dataTableView}
    </React.Fragment>
  );
}

export default FuturesContractsData;