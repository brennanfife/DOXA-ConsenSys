const PrizedLinkedContract = artifacts.require("PrizedLinkedContract");

contract("PrizedLinkedContract", accounts => {
    let myContract;    
    
    before("Setup contract", async () => {
        myContract =  await PrizedLinkedContract.new(); // new instance of PrizedLinkedContract contract
    });

    //* Test no one is in our contract when it is initially created. 
    //* This test should only be checked for first month... After 2nd, 3rd, 4th, etc. It would change.
    it('Test the pool initially returns zero', async () => {
        let poolSize = await myContract.pool() 
        assert.equal(poolSize, '0')
    })

    //* Test we don't automatically have a winner chosen.
    it('Test a winner isn\'t chosen until the pool ends', async () => {
        assert.equal(await myContract.winningAddress(), '0x0000000000000000000000000000000000000000')
    })

    //* Test viewDeposit is working so entrants can view their savings
    it("Test viewDeposit", async () => {
        let initialDeposit = "1000000000000000000"; //wei
        await myContract.addToPool({from: accounts[0], value: initialDeposit});
        let viewedDeposit = await myContract.viewDeposit();
        assert.equal(initialDeposit, await viewedDeposit.toString(), "Correct deposit should be displayed");
    })

    //* Test withdrawAll is working so entrants can withdraw their savings
    it("Test withdrawAll", async () => {
        let initialDeposit = "1000000000000000000"; //wei
        await myContract.addToPool({from: accounts[0], value: initialDeposit});
        await myContract.withdrawAll({from: accounts[0]})
        let viewedDeposit = await myContract.viewDeposit();
        assert.equal(viewedDeposit, 0, "Entrant should have an account of 0");
    })

    //* Test that a winner has actually been chosen after endPool has been called. HOW to test with address??
    it("Test a winner has been chosen", async () => {
        let initialDeposit = "1000000000000000000"; //wei
        await myContract.addToPool({from: accounts[0], value: initialDeposit});
        await myContract.addToPool({from: accounts[1], value: initialDeposit});
        await myContract.addToPool({from: accounts[2], value: initialDeposit});
        await myContract.lockPool();
        let winningAddress = await myContract.chooseWinner();
        await myContract.closePool();
        assert.notEqual(winningAddress, '0x0000000000000000000000000000000000000000')
    })
});