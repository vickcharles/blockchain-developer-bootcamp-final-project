import RealEstatePropertyFactory from "../contracts/RealEstatePropertyFactory.json";
import getWeb3 from "../getWeb3";

const instance = async () => {
  let web3;
  let networkId;
  web3 = await getWeb3();
  networkId = await web3.eth.net.getId();
  const deployedNetwork = RealEstatePropertyFactory.networks[networkId];

  return new web3.eth.Contract(
    RealEstatePropertyFactory.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export default instance;
