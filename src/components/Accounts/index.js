import React, { Component } from 'react';
import './index.css';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Table, Button, ButtonGroup } from 'reactstrap'

var web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));



class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            balances: [],
            currency: "wei",
        };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(rSelected) {
        if (rSelected == 2) {
            this.setState({ currency: "ether" });
        }
        else {
            this.setState({ currency: "wei" });
        }

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
                    accounts: currAccounts
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
                    })
                })
            })
    }
    render() {
        var tableRows = [];
        var balance_aux = [];

        if (this.state.currency == "wei") {
            balance_aux = this.state.balances;
        }

        else {
            balance_aux = this.toEther(this.state.balances);
        }
        _.each(this.state.accounts, (value, index) => {

            tableRows.push(
                <tr key={this.state.accounts[index]}>
                    <td className="account">{this.state.accounts[index]}</td>
                    <td className="balance">{balance_aux[index]}</td>
            </tr>
            )
        })
        return (

            <div className="Home">
                <h2>Accounts</h2>
                Main account: {this.state.accounts[0]}
                <Table striped bordered condensed hover>
                    <thead><tr>
                        <th className="Account">Accounts</th>
                        <th className="Account">Balance
                            <ButtonGroup>
                                <Button outline color="info" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Ether</Button>
                                <Button outline color="info" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Wei</Button>
                            </ButtonGroup>
                        </th>
                    </tr></thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Accounts;