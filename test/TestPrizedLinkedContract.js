const PrizedLinkedContract = artifacts.require("PrizedLinkedContract");

contract("GetterSetter", accounts => {
    let myContract;    
    
    before("Setup contract", async () => {
        myContract =  await PrizedLinkedContract.new(); // new instance of PrizedLinkedContract contract
    });

    // let totalTransferredEther = 0;
    // beforeEach("Get 1 ether before each test", async () => { // 'beforeEach' test before, then beforeEach > it
    //     await myContract.sendTransaction({from: accounts[0], 
    //         value:await web3.utils.toWei("1", "ether")});   //web3 is always available in truffle testing
    //     totalTransferredEther++;
    // });

    it("Test viewDeposit", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });

    it("Test initial message", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });

    it("Test initial message", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });

    it("Test initial message", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });

    it("Test initial message", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });





    // GetterSetter tests
    it("Test initial message", async () => {
        let storedMessage = await myContract.getMessage();
        assert.equal(storedMessage, initialMessage, "Constructor and getMessage should match");
    });

    it("Test set and get message", async () => {
        let newMessage = "New message";
        await myContract.setMessage(newMessage);
        let storedMessage = await myContract.getMessage();
        assert.equal(newMessage, storedMessage, "setMessage and getMessage should match");
    });

    it("Test transfer ether", async () => {
        let balance = await web3.eth.getBalance(myContract.address);
        let totalTransferredWei = await web3.utils.toWei(totalTransferredEther.toString(), "ether");
        assert.equal(balance, totalTransferredWei, "Total ether transferred and balance should match");
    });
});