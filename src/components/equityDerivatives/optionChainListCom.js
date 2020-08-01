import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JOBLIST } from '../../store/actions/jobListActions'
//import { Link } from 'react-router-dom'

class OptionChainListCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorts: 1
    };
  }
  /*componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  onScroll = () => {
    if (this.props.list) {
      if (((this.props.pages + 1) * 10) === this.props.list.jobs.length) {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10) && this.props.list.jobs.length) {
          this.props.handlerFromParant({ page: this.props.pages + 1 });
        }
      }
    }
  }
  sortFieldChanges = (event) => {
    this.setState({ page: 0, sorts: event.target.value });
    this.props.handlerFromParant({ sorts: event.target.value, page: 0 });
  }
  handleSubmit = () => {
    this.setState({ page: this.props.pages + 1 });
    this.props.handlerFromParant({ sorts: this.state.sorts, page: this.props.pages + 1 });
  }*/

  render() {
    const { list } = this.props;

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
    function probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, optionPriceCE, IVCE, index, option) {
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
      console.log(greek);
      Object.assign(list.data[index][option], greek);
    }
    function greekOption(data, index, option) {
      var stockPrics = 10181.15;
      var strikePrice = data.strikePrice;
      var noriskInterestRate = 6.5;
      var timeToMaturity = 3;
      var optionPriceCE = data.lastPrice;
      var IVCE = data.impliedVolatility;
      if (data.lastPrice > 0) {
        probabilityX(stockPrics, strikePrice, noriskInterestRate, timeToMaturity, optionPriceCE, IVCE, index, option);
      }
    }

    let dataTableView;
    if (list && list.data) {
      dataTableView = list.data.map((data, index) => {
        if(data.CE.lastPrice > 1 && data.PE.lastPrice > 1){
        greekOption(data.CE, index, 'CE');
        greekOption(data.PE, index, 'PE');
        return (
          <tr className="pl-0 pb-2 col-md-6 col-lg-6 col-xl-4" key={data.strikePrice}>
            <td>{data.CE.rho}</td>
            <td>{data.CE.vega}</td>
            <td>{data.CE.gamma}</td>
            <td>{data.CE.theta}</td>
            <td>{data.CE.delta}</td>
            <td>{data.CE.callPrice}</td>
            <td>{data.CE.lastPrice}</td>
            <td>{data.CE.impliedVolatility}</td>
            <th scope="row">{data.strikePrice}</th>
            <td>{data.PE.impliedVolatility}</td>
            <td>{data.PE.lastPrice}</td>
            <td>{data.PE.callPrice}</td>
            <td>{data.PE.delta}</td>
            <td>{data.PE.theta}</td>
            <td>{data.PE.gamma}</td>
            <td>{data.PE.vega}</td>
            <td>{data.PE.rho}</td>
          </tr>
        )
        }  
      })
    }

    return (
      <div className="marketing">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rho</th>
              <th scope="col">Vega</th>
              <th scope="col">Gamma</th>
              <th scope="col">Theta</th>
              <th scope="col">Delta</th>
              <th scope="col">CallPrice</th>
              <th scope="col">CE LTP</th>
              <th scope="col">CE IV</th>
              <th scope="col">StrikePrice</th>
              <th scope="col">PE IV</th>
              <th scope="col">PE LTP</th>
              <th scope="col">CallPrice</th>
              <th scope="col">Delta</th>
              <th scope="col">Theta</th>
              <th scope="col">Gamma</th>
              <th scope="col">Vega</th>
              <th scope="col">Rho</th>
            </tr>
          </thead>
          <tbody>
            {dataTableView}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { list: state.optionChainReducer.data, error: state.error }
}
const mapDispatchToProps = (dispatch) => {
  return { onFetchData: (q) => dispatch(JOBLIST(q)) }
}
export default connect(mapStatetoProps, mapDispatchToProps)(OptionChainListCom);
