//import React, {  Suspense } from 'react'
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//const OptionChainList = React.lazy(() => import('./pages/optionChainList'));
//const OptionChainDetail = React.lazy(() => import('./pages/optionChainDetail'));
const OptionChain = React.lazy(() => import('./pages/optionChain'));
const StrategyBuilder = React.lazy(() => import('./pages/strategyBuilder'));
//const proxy = require("http-proxy-middleware");
//const proxy = require('http-proxy-middleware');
//import Proxy from 'http-proxy-middleware';
//const { createProxyMiddleware } = require('http-proxy-middleware');
 
//App.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

// module.exports = function(App) {
//     App.use(Proxy('/api/*', { target: 'http://localhost:5000' }))
// }

class App extends Component {
  render() {
    return (
      <div className="cards">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/* <Route exact={true} path='/' component={OptionChainList} /> */}
              <Route path='/strategy-builder/:strike/:opt/:date' component={StrategyBuilder} />
              <Route path='/strategy-builder' component={StrategyBuilder} />
              <Route path='/OptionChain' component={OptionChain} />
              <Route path='' component={OptionChain} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App; 
