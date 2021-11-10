import React, { Component } from "react";
import RealEstatePropertyFactory from "./contracts/RealEstatePropertyFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

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
      console.log(RealEstatePropertyFactory.networks);
      const deployedNetwork = RealEstatePropertyFactory.networks[networkId];
      console.log(deployedNetwork);
      const instance = new web3.eth.Contract(
        RealEstatePropertyFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // instance.methods.createProperty('0x3C5b618b756342E529116563e1075B30A638e68e', 'ds', 'sd', 1, 1).send({ from: accounts[0]})

    const res = await instance.methods.getProperties().call();

     console.log(res[0].properties[0]);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;




    // Update state with the result.
    this.setState({ storageValue: accounts });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
