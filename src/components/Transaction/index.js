import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import Web3 from 'web3';
import _ from 'lodash';
import { Table, Button, Container, Row, Col, InputGroup, InputGroupAddon, Form, FormGroup, Label, Input, FormText } from 'reactstrap'


var web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      balances: [],
      fromAccount: "",
      toAccount: "",
      amount: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  handleSubmit(event) {
    this.newTransaction();
  }

  newTransaction() {
    console.log("Transaction");

    var transaction = {
      from: this.state.fromAccount,
      to: this.state.toAccount,
      value: this.state.value
    };

    web3.eth.sendTransaction(transaction, (error, result) => {
      if (!error) {
        alert("Success!"+result);
      }
      else {
        console.log(error);
      }
    });
  }

  componentWillMount() {
    this.getAccounts();
  }

  toEther(wei) {
    var ether = [];
    if (wei == null) {
      return wei;
    }
    else {
      _.each(wei, (value, index) => {
        ether[index] = wei[index] / 1e18;
      });
      return ether;
    }
  }

  getAccounts() {
    var promise = new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, currAccounts) => {
        if (!error) {
          resolve(currAccounts);
        }
        else {
          reject(error)
        }
      })
    });
    promise.then(
      (currAccounts) => {
        this.setState({
          accounts: currAccounts,
          fromAccount: currAccounts[0]
        })
      }).then(() => {
        var promises = [];
        this.state.accounts.forEach((error, element) => {
          var prom = new Promise((resolve, reject) => {
            web3.eth.getBalance(this.state.accounts[element], (error, balance) => {
              if (!error) {
                resolve(balance);
              }
              else {
                reject(error)
              }
            })
          });
          promises.push(prom);
        }, this);

        Promise.all(promises).then((balance) => {
          this.setState({
            balances: balance
          });
        });
      });
  }
  render() {
    var optionRows = [];
    var balance_aux = [];

    _.each(this.state.accounts, (value, index) => {

      optionRows.push(
        <option key={this.state.accounts[index]} value={value}>
          {this.state.accounts[index]}
        </option>
      )
    })

    return (
      <div className="newTransaction">
        <h2>New Transaction</h2>
        <br />
        <div>
          <Container>
            <Form>
              <FormGroup>
                <Label for="exampleSelect">Local account</Label>
                <Input type="select" onChange={this.handleChange} name="fromAccount" id="exampleSelect">
                  {optionRows}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" onChange={this.handleChange} name="password" id="examplePassword" placeholder="password" />
              </FormGroup>

              <FormGroup>
                <Label for="toAccount">To</Label>
                <Input name="toAccount" onChange={this.handleChange} required pattern="0x.{40}" id="toAccount" placeholder="0x3f8d49A4712c2d8D50F0cAd56A8C499Bf8BeB2eE (Account to send the ETH)" />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input type="number" onChange={this.handleChange} name="amount" placeholder="Amount of Wei to send" />
              </FormGroup>
              <Button onClick={this.handleSubmit}>Send</Button>
            </Form>
          </Container>
        </div>
      </div>
    );
  }
}
export default Transaction;

