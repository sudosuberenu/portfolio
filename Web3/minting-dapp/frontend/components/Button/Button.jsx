import React from 'react';
import axios from 'axios';
import './Button.css';
import { BuyerContext } from '../../context/context';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  async pay(nft) {
    try {
      const web3 = window.web3;
      const { buyer, title, description } = nft;

      const contract = {}

      await contract.methods
      .payToMint(title, description)
      .send({ from: buyer, value: 100 });

    } catch (error) {

    }
  }

  async mint() {
    try {
      const response = await axios.get("https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/1.json");
      const web3 = window.web3;
      // const { buyer, title, description } = nft;

      const contract = {}

      

      await contract.methods.mint().send({ from: BuyerContext, value: 100 });

    } catch (error) {

    }
  }
  
  render() {
    return
    <BuyerContext.Consumer>
      <button className="button" onClick={this.mint}>Mint</button>
    </BuyerContext.Consumer> 
  }
}

export default Button;