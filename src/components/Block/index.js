import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import Web3 from 'web3';
import { Table } from 'reactstrap'



var web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    };
  }
  componentWillMount() {

    var block_id = this.props.match.params.block_ids;
    this.getBlockState(block_id);
  }

  getBlockState(block_id) {
    console.log("Block number: " + block_id);


    var promise = new Promise((resolve, reject) => {

      web3.eth.getBlock(block_id, (error, currBlockObj) => {
        if (!error) {
          console.log(currBlockObj);
          resolve(currBlockObj);
        }
        else {
          console.log("Error, promise rejected");
          reject(error);
        }
      });
    });


    promise
      .then(
      (currBlockObj) => {
        this.setState({
          block_id: currBlockObj.number,
          block_hash: currBlockObj.hash,
          block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
          block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
          block: currBlockObj
        });
      })
      .catch(console.error.bind(console));

  }
  render() {
    const block = this.state.block;
    const difficulty = parseInt(block.difficulty, 10);
    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    return (
      <div className="Block">
        <h2>Block Info</h2>
        <div>
          <Table bordered condensed striped>
            <tbody>
              <tr><td className="tdLabel">Height: </td><td>{this.state.block.number}</td></tr>
              <tr><td className="tdLabel">Timestamp: </td><td>{this.state.block_ts}</td></tr>
              <tr><td className="tdLabel">Transactions: </td><td>{this.state.block_txs}</td></tr>
              <tr><td className="tdLabel">Hash: </td><td>{this.state.block.hash}</td></tr>
              <tr><td className="tdLabel">Parent hash: </td><td>{this.state.block.parentHash}</td></tr>
              <tr><td className="tdLabel">Nonce: </td><td>{this.state.block.nonce}</td></tr>
              <tr><td className="tdLabel">Size: </td><td>{this.state.block.size} bytes</td></tr>
              <tr><td className="tdLabel">Difficulty: </td><td>{difficulty}</td></tr>
              <tr><td className="tdLabel">Difficulty: </td><td>{difficultyTotal}</td></tr>
              <tr><td className="tdLabel">Gas Limit: </td><td>{block.gasLimit}</td></tr>
              <tr><td className="tdLabel">Gas Used: </td><td>{block.gasUsed}</td></tr>
              <tr><td className="tdLabel">Sha3Uncles: </td><td>{block.sha3Uncles}</td></tr>
              <tr><td className="tdLabel">Extra data: </td><td>{this.state.block.extraData}</td></tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default Block;