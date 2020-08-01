import React, { useState, useEffect } from "react";
import { JOBLIST } from '../store/actions/optionChainListActions';
import { connect, useSelector } from 'react-redux';

import Header from '../common/header';
import Footer from '../common/footer';
import StrategyBuilderCustom from '../components/strategyBuilder/strategyBuilderCustom';

import Plot from 'react-plotly.js';

const OptionChain = ({ onFetchData, match }) => {
   const [optChainRecord, setOptChainRecord] = useState(0);
   //const dispatch = useDispatch();
   let optChainData = useSelector(state => state.optionChainReducer.data);
   if (optChainData && optChainData.filtered && optChainRecord === 0) {
         handleChildClick(match.params.strike, match.params.opt, match.params.date);
   }
   useEffect(() => {
      onFetchData('');
   }, []);
   function handleChildClick(strike, opt, date) {
      setOptChainRecord(optChainData.records.data.filter(item => item.expiryDate === date && item.strikePrice === parseInt(strike)));
      //console.log(optChainRecord);
   }
   //console.log(optChainRecord[0]);
   return (
      <div className="rows">
         <Header />
         <div className="container">
            <h1>Strategy Builder</h1>
            {/* <Plot
               data={[
                  {
                     x: [1, 2, 3, 4, 5],
                     y: [2, 6, 3, 6, 2],
                     type: 'scatter',
                     mode: 'lines+markers',
                     marker: { color: 'red' },
                  },
                  { type: 'bar', x: [1, 2, 3, 4, 5], y: [2, 6, 3, 6, 2] },
               ]}
               layout={{ width: 600, height: 450, title: 'Strategy Builder' }}
            />  */}

               <StrategyBuilderCustom callPutData={optChainRecord[0]} option={match.params.opt}  />

             
            {/* <FuturesContractsFilter ExpDates={optChainData && optChainData.records.expiryDates} timeStamp={optChainData && optChainData.records.timestamp} underlyingValue={optChainData && optChainData.records.underlyingValue} onChildClick={handleChildClick} /> */}
            {/* <FuturesContracts callPutData={optChainRecord} /> */}
         </div>
         <Footer />
      </div>
   );
};

const mapStateToProps = state => {
   return {
      list: state.optionChainReducer.data
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onFetchData: q => dispatch(JOBLIST(q))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionChain);
