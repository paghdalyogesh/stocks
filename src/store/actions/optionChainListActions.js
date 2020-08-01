
import Api from "../api"
 
export const JOBLIST = (body) => {
    let reqUrl = './api/option-chain-indices.json';
    // if(body === 'BANKNIFTY' || body === 'NIFTY'){
    //     reqUrl = '/api/option-chain-indices?symbol='+ body;
    // } else {
    //     reqUrl = '/api/option-chain-equities?symbol='+ body;
    // }
    return (dispatch, getState) => {
        return Api.getCall(reqUrl)
            .then(response => response.json())
            .then(json => dispatch({ type: "FetchData", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
