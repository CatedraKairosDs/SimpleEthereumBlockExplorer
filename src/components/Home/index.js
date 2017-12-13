import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
//import 'react-bootstrap/dist/react-bootstrap.css'

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            block_ids: [],
            block_hashes: [],
            curr_block: null
        }
    }

    componentWillMount() {
        web3.eth.getAccounts((error, accounts) => {
            console.log(accounts)
        });

        var promise = new Promise((resolve, reject) => {
            web3.eth.getBlockNumber((error, blockNum) => {
                if (!error) {
                    resolve(blockNum);
                } else {
                    reject(error);
                }
            });
        })
        promise
            .then((blockNum) => {
                console.log(blockNum);
                this.setState({ curr_block: blockNum });
                this.getBlocks(blockNum);
                return blockNum;
            })
            .catch((error) => { console.log(error) });


        //     promises = Array (promises);

        //     Promise.all(promises)
        //         .then((results) => {
        //             return results.sort();
        //         })
        //         .then(this.setState)

        // web3.eth.getBlockNumber((error, blockNum) => {
        //     this.setState({ curr_block: blockNum });
        //     this.getBlocks(blockNum);
        // });

    }

    getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();
        var max_blocks = 10;

        if (curr_block_no < max_blocks)
            max_blocks = curr_block_no;

        for (var i = 0; i < max_blocks; i++ , curr_block_no--) {
            var promise = new Promise((resolve, reject) => {
                web3.eth.getBlock(curr_block_no,
                    (error, block) => {
                        if (!error)
                            resolve(block);
                        else
                            reject(error);
                    })
            });
            promise
                .then((block)=>{
                    block_ids.push(block.number);
                    block_hashes.push(block.hash);
                    block_ids.sort().reverse();
                    block_hashes.sort().reverse();
                    this.setState({
                        block_ids: block_ids,
                        block_hashes: block_hashes
                    });
                })
        }
        // console.log(promises);
        // Promise.all(promises)
        //     .then(() => {
        //         console.log("hola");
        //         block_ids.sort().reverse();
        //         block_hashes.sort().reverse();
        //         this.setState({
        //             block_ids: block_ids,
        //             block_hashes: block_hashes
        //         });
        //         console.log("hola2");
        //     })
        //     .catch((error) => { console.log(error) })



    }

    render() {
        var tableRows = [];
        _.each(this.state.block_ids, (value, index) => {
            tableRows.push(
                <tr key={this.state.block_hashes[index]}>
                    <td className="tdCenter"><Link to={`/block/${this.state.block_ids[index]}`}>{this.state.block_ids[index]}</Link></td>
                    <td className="tdLeft">{this.state.block_hashes[index]}</td>
                </tr>
            )
        });

        return (
            <div className="Home">
                <h2>Home page</h2>
                Total Blocks: {this.state.curr_block}
                <div className="table">
                <Table striped bordered condensed hover >
                <thead><tr>
                        <th>Block No</th>
                        <th>Hash</th>
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

export default Home;