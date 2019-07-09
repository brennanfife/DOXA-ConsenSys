var PrizedLinkedContract = artifacts.require("./PrizedLinkedContract.sol");

module.exports = function(deployer) {
  deployer.deploy(PrizedLinkedContract);
};