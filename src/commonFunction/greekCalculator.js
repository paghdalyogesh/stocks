//import React from "react";

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
function probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, IVCE, option) {
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
    callPrice: callPrice.toFixed(2),
    delta: delta.toFixed(2),
    theta: theta.toFixed(2),
    gamma: gamma.toFixed(2),
    vega: vega.toFixed(2),
    rho: rho.toFixed(2)
  }
  return greek;
}
/* function greekOption(data, option) {
  if (data && data.strikePrice && data.impliedVolatility && data.lastPrice) {
    var stockPrics = data.underlyingValue;
    var strikePrice = data.strikePrice;
    var noriskInterestRate = 6.5;
    var timeToMaturity = dayDiff(data.expiryDate);
    var IVCE = data.impliedVolatility;
    if (data.lastPrice > 0) {
      return probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, IVCE, option);
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
}*/
const GreekCalculator = (underlyingValue, strikePrice, expiryDate, impliedVolatility, option) => {
  var noriskInterestRate = 6.5;
  var timeToMaturity = dayDiff(expiryDate);
  console.log(underlyingValue +' -- '+ strikePrice +' -- '+ noriskInterestRate +' -- '+ timeToMaturity +' -- '+ impliedVolatility +' -- '+ option);
  return probabilityX(underlyingValue, strikePrice, noriskInterestRate, timeToMaturity, impliedVolatility, option);
  //return greekOption(props, option);
  //setGreekValue(GreekCalculator(callPutData.underlyingValue, callPutData.strikePrice, callPutData.expiryDate, callPutData.impliedVolatility, "CE"));

}
export default GreekCalculator;
