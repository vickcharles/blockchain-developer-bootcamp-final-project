import React, { Component } from "react";
import RealEstatePropertyFactory from "./contracts/RealEstatePropertyFactory.json";
import getWeb3 from "./getWeb3";
import RentersList from "./components/containers/renters/RenterList";
import AppNavBar from "./components/ui/NavBar/AppNavBar";

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
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
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
    return (
      <div className="App">
        <AppNavBar />
        <RentersList />
      </div>
    );
  }
}

export default App;
