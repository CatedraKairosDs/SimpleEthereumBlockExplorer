import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import logo from './logo.svg';
import Block from './../Block';
import Block_List from './../Block_List';
import Navigation from './../Navbar';
import Accounts from './../Accounts'
import Transaction from './../Transaction';

import { Nav, NavItem } from 'reactstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ethereum Block Explorer</h2>
        </div>
        <div className="App-nav">

        <Router>
          <div>
          <Navigation></Navigation>


            <Route exact path="/" component={Block_List} />
            <Route path="/block/:block_ids" component={Block} />
            <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/transactions" component={Transaction} />

          </div>
        </Router>
        </div>
      </div>
    );
  }
}
export default App;