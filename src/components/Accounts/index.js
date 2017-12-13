import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
//import 'react-bootstrap/dist/react-bootstrap.css'

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            accountsNum: null,
            balances: [],
            balEther: []
        }
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
                    accounts: accounts
                });

                this.getBalance(accounts);
                return accounts;
            })
            .catch((error) => { console.log(error) });
    }

    getBalance(accounts) {

        var promises = [];
        _.each(accounts, (value, index) => {
            var promise = new Promise((resolve, reject) => {
                web3.eth.getBalance(accounts[index], (error, balance) => {
                    if (!error) {
                        resolve(balance);
                    } else {
                        reject(error);
                    }
                });
            });
            promises.push(promise);
        });

        Promise.all(promises)

            .then((balances) => {
                var balEthers = [];
                _.each(balances, (value, index) => {
                    balEthers.push(Number(value / (Math.pow(10, 18))).toFixed(5));
                })

                this.setState({
                    balances: balances,
                    balEther: balEthers
                })
            })


    }

    render() {
        var tableRows = [];
        _.each(this.state.accounts, (value, index) => {
            tableRows.push(
                <tr key={this.state.accounts[index]}>
                    <td className="tdCenter" id="negrita">
                        {this.state.accounts[index]}
                    </td>
                    <td className="tdCenter">
                        {this.state.balances[index]}
                    </td>
                    <td className="tdCenter">
                        {this.state.balEther[index]}
                    </td>
                </tr>
            )
        });

        return (
            <div className="Accounts">
                <h2>Accounts Page</h2>
                Total Accounts: {this.state.accountsNum}
                <div className="table">
                    <Table striped bordered condensed hover>

                        <thead><tr>
                            <th>Accounts</th>
                            <th>Balance (Wei)</th>
                            <th>Balance (ETH)</th>
                        </tr></thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Accounts;