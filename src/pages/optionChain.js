import React, { useState, useEffect } from "react";
import { JOBLIST } from '../store/actions/optionChainListActions';
import { connect, useSelector } from 'react-redux';

import Header from '../common/header';
import Footer from '../common/footer';
import ExpiryDates from '../components/equityDerivatives/expiryDates';
//import FuturesContractsFilter from '../components/EquityDerivatives/futuresContractsFilter';
import FuturesContracts from '../components/equityDerivatives/futuresContracts';

const OptionChain = ({ onFetchData }) => {
   const [optChainRecord, setOptChainRecord] = useState(0);
   const [selectOptions, setSelectOptions] = useState(0);
   //const dispatch = useDispatch();
   let optChainData = useSelector(state => state.optionChainReducer.data);
   if (optChainData && optChainData.filtered && optChainRecord === 0) {
      setOptChainRecord(optChainData.filtered.data);
      if (optChainData.filtered.data[0] && optChainData.filtered.data[0].PE) {
         setSelectOptions(optChainData.filtered.data[0].PE.underlying);
      } else if(optChainData.filtered.data[0] && optChainData.filtered.data[0].CE) {
         setSelectOptions(optChainData.filtered.data[0].PE.underlying);
      } else {
         setSelectOptions('');
      }  
   }
   useEffect(() => {
      onFetchData('NIFTY');
   }, []);
   function handleChildClick(ExpDate) {
      setOptChainRecord(optChainData.records.data.filter(item => item.expiryDate === ExpDate));
   }
   function handleChildChange(options) {
      onFetchData(options);
   }
   return (
      <div className="rows">
         <Header />
         <div className="container1 mt-4">
            {/* <FuturesContractsFilter ExpDates={optChainData && optChainData.records.expiryDates} timeStamp={optChainData && optChainData.records.timestamp} underlyingValue={optChainData && optChainData.records.underlyingValue} onChildClick={handleChildClick} /> */}
            <ExpiryDates ExpDates={optChainData && optChainData.records.expiryDates} timeStamp={optChainData && optChainData.records.timestamp} selectOptions={selectOptions} underlyingValue={optChainData && optChainData.records.underlyingValue} onChildChange={handleChildChange} onChildClick={handleChildClick} />
            <FuturesContracts callPutData={optChainRecord} />
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
