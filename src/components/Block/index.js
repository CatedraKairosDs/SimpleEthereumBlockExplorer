import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
//import imagen from './block.png'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Button} from 'react-bootstrap'

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    }
  }

  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var block_id = this.props.match.params.blockId;
    this.getBlockState(block_id);
  }

  getBlockState(block_id) {
    console.log("Block id: " + block_id);
    // Use web3 to get the Block object
    var promise = new Promise((resolve, reject) => {
      web3.eth.getBlock(block_id, (error, currBlockObj) => {
        if (!error)
          resolve(currBlockObj);
        else
          reject(error);
      })
    });
    promise
      .then((currBlockObj)=>{
        this.setState({
          block_id: currBlockObj.number,
          block_hash: currBlockObj.hash,
          block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
          block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
          block: currBlockObj
        })
      })
      .catch((error) => console.log(error));

  }

  render() {
    const block = this.state.block;
    const difficulty = parseInt(block.difficulty, 10);
    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    return (
      <div className="Block" >
        <div>
          <div className="Button text-left"><text> Block Info</text></div>
          <div className="Button text-right"> <button type="button" class="btn btn-outline-info">
            <Link to="/" id="boton">Return </Link></button> </div>
        </div>
         
        <div className="table">
        <Table size="sm" striped bordered condensed hover >
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
      </div >
    );
  }
}
export default Block;