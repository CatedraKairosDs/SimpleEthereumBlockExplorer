import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Block from './../Block';
import Home from './../Home';
import Accounts from './../Accounts';
import Transfers from './../Transfers';
import NavTool from './Navegation'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Block Explorer</h2>
        </div>
        <div className="App-nav">
        <Router>
            <div>
              <NavTool />
                <Route exact path="/" component={Home}/>
                <Route path="/block/:blockId" component={Block}/>
                <Route path="/accounts" component={Accounts}/>
                <Route path="/transfers" component={Transfers}/>
            </div>
        </Router>
        </div>
      </div>
    );
  }
}
export default App; 