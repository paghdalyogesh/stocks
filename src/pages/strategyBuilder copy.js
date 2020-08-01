import React, { useState, useEffect } from "react";
import { JOBLIST } from '../store/actions/jobListActions';
import { connect, useSelector } from 'react-redux';

import Header from '../common/header';
import Footer from '../common/footer';
import StrategyBuilderCustom from '../components/strategyBuilder/strategyBuilderCustom';
 

//import Plot from 'react-plotly.js';

var i = 0;
const OptionChain = ({ onFetchData }) => {
   const [optChainRecord, setOptChainRecord] = useState(0);
   //const dispatch = useDispatch();
   let optChainData = useSelector(state => state.optionChainReducer.data);
   if (optChainData && optChainData.filtered) {
      if (i === 0) {
         handleChildClick('25-Jun-2020');  
         //console.log("call")     
      }
      i++;
   }
   useEffect(() => {
      onFetchData('');
   }, []);
   function handleChildClick(ExpDate) {
      //console.log(optChainData.records.data.filter(item => item.expiryDate === ExpDate && item.strikePrice === 4600));
      setOptChainRecord(optChainData.records.data.filter(item => item.expiryDate === ExpDate && item.strikePrice === 9600));
   }
   
   return (
      <div className="rows">
         <Header />
         <div className="container">
            <h1>yogesh</h1>
            <StrategyBuilderCustom callPutData={optChainRecord}  />

            {/* <Plot
               data={[
                  {
                     x: [1, 2, 3],
                     y: [2, 6, 3],
                     type: 'scatter',
                     mode: 'lines+markers',
                     marker: { color: 'red' },
                  },
                  { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
               ]}
               layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
            /> */}
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
