import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import './css/style.css';
//const proxy = require('http-proxy-middleware');
//import Proxy from 'http-proxy-middleware';
//const { createProxyMiddleware } = require('http-proxy-middleware');
 
//App.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

// module.exports = function(App) {
//     App.use(Proxy('/api/*', { target: 'http://localhost:5000' }))
// }


import rootReducer from './store/reducers/rootReducer'
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.hydrate(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();