//import Cookies from 'universal-cookie'
import { api } from '../config'
//const cookies = new Cookies();
//const userIds = cookies.get('userID');
//const auth = cookies.get('auth');

//const API_BASE_ADDRESS =  "https://www.nseindia.com"; //api.apiRoot;
//https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY&identifier=OPTIDXNIFTY11-06-2020CE10200.00
//https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY

export default class Api {
    static getCall(api) {
        //const uri = API_BASE_ADDRESS + api;
        //var proxy = { host: 'https://api.npms.io' };
        //https://api.npms.io/v2/search?q=reactjs
/* var xhr = new XMLHttpRequest(proxy);
xhr.open('GET', "/v2/search?q=reactjs", false); 
xhr.send();
//response type defaults to "text"
var type1=xhr.responseType;
var resp1=xhr.response;



console.log(xhr.response)*/
 
       // console.log(fetch);
        return fetch(api, {
            method: 'GET',
            headers: new Headers({
                'accept-encoding': 'gzip, deflate, br', 
                'accept-language': 'en-US,en;q=0.9',
                'Content-Type': 'application/json'
              })
        })
    }
    static postCall(api, data) {
        //const uri = API_BASE_ADDRESS + api;
        return fetch(api, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'accept-encoding': 'gzip, deflate, br', 
                'accept-language': 'en-US,en;q=0.9',
                'Content-Type': 'application/json',
                'set-cookie':''
              })
        });
    }
}