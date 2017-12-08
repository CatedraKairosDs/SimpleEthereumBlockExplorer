import React, { Component } from 'react';
import './index.css';
import Web3 from 'web3';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

var web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));



class Block_List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_hashes: [],
            curr_block: null
        };
    }

    componentDidMount() {
        web3.eth.getBlockNumber((error, curr_block_no) => {
            if (!error) {
                this.setState({ curr_block: curr_block_no });
                this.getBlocks(curr_block_no);                
            }
            else {
                console.log(error);
            }
        });
    }

    getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();

        var max_blocks = 10;

        if (curr_block_no < max_blocks) max_blocks = curr_block_no;

        for (var i = 0; i < max_blocks; i++ , curr_block_no--) {
            var currBlockObj;

            web3.eth.getBlock(curr_block_no, (error, result) => {
                currBlockObj = result;
                block_ids.push(currBlockObj.number);
                block_ids.sort().reverse();
                block_hashes.push(currBlockObj.hash);
                block_hashes.sort().reverse();
                

                this.setState({
                    block_ids: block_ids,
                    block_hashes: block_hashes
                })
            });
        }
    }

    
    render() {
        var tableRows = [];
        _.each(this.state.block_ids, (value, index) => {
            tableRows.push(
                <tr key={this.state.block_hashes[index]}>
                    <td className="tdCenter">{this.state.block_ids[index]}</td>
                    <td className="hash"><Link to={`/block/${this.state.block_ids[index]}`}>{this.state.block_hashes[index]}</Link></td>
                </tr>
            )
        })
        return (
            <div className="Home">
                <h2>Last Blocks</h2>
                Current Block: {this.state.curr_block}
                <Table striped bordered condensed hover>
                    <thead><tr>
                        <th>Block No.</th>
                        <th className="hash">Hash</th>
                    </tr></thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Block_List;