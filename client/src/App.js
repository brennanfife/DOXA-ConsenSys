import React, { Component } from 'react';
import './resources/styles.css'

import Header from './components/header_footer/Header'
import Featured from './components/featured' 
import DOXAFeatures from './components/doxaFeatures'
import Highlight from './components/highlights'
import Savings from './components/savings'
import Footer from './components/header_footer/Footer'

import PrizeLinkedContract from "./contracts/PrizedLinkedContract.json";
import getWeb3 from "./utils/getWeb3";

class App extends Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PrizeLinkedContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PrizeLinkedContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      console.log(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App" style={{ height: '1500px', background: 'black'}}>
        <Header />
        <Featured />
        <DOXAFeatures />
        <Highlight />
        <Savings />
        <Footer />
      </div>
    );
  }
}
  
export default App