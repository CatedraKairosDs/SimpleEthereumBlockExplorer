import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Transfers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      accountsNum: null,
      selectFrom: '',
      selectTo: '',
      value: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

    this.getAccounts();

  }

  getAccounts() {
    var promise = new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        if (!error) {
          resolve(accounts);
        } else {
          reject(error);
        }
      });
    })
    promise
      .then((accounts) => {
        this.setState({
          accountsNum: accounts.length,
          accounts: accounts,
          selectFrom: accounts[0]
        });
        return accounts;
      })
      .catch((error) => { console.log(error) });
  }

  createSelectItems() {
    let items = [];
    _.each(this.state.accounts, (value, index) => {
      items.push(<option key={value} value={value}>{value}</option>);
    });
    return items;
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    
    //web3.personal.unlockAccount(this.state.selectFrom, "alejandro", 1000);
    web3.eth.sendTransaction({
      from: this.state.selectFrom,
      to: this.state.selectTo,
      value: this.state.value
    }, function (err, value) {
      if (err)
      alert('Transaction failed: ' + err);
      else
        alert('Transaction completed: ' + value);
    });
    console.log({
      from: this.state.selectFrom,
      to: this.state.selectTo,
      value: this.state.value
    })
    //event.preventDefault();
  }

  // sendTransaction() {
  //   
  // }

  render() {

    return (
      <div className="Transfers" >
        <Container>
          <h1>New Transaction</h1>
          <Form>
            <FormGroup>
              <Label for="selectFrom">From:</Label>
              <Input type="select" name="selectFrom" id="selectFrom" onChange={this.handleInputChange}>
                {this.createSelectItems()}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectTo">To:</Label>
              <InputGroup>
                <InputGroupAddon>Start with 0x...</InputGroupAddon>
                <Input type="text" name="selectTo" id="selectTo" required="true" pattern="0x.{40}"
                  onChange={this.handleInputChange} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="value">Value</Label>
              <Input type="number" name="value" id="value" placeholder="Insert amount" required
                onChange={this.handleInputChange} />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Container>
      </div >
    );
  }
}
export default Transfers;