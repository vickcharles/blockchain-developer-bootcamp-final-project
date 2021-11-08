var Migrations = artifacts.require("./RealEstatePropertyFactory.sol");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
