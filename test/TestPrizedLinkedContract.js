const PrizedLinkedContract = artifacts.require("PrizedLinkedContract");

contract("PrizedLinkedContract", accounts => {
    let myContract;    
    
    before("Setup contract", async () => {
        myContract =  await PrizedLinkedContract.new(); // new instance of PrizedLinkedContract contract
    });

    //TODO: Test no one is in when contract is created
    //!This test will only be checked for first month... After 2nd, 3rd, 4th, etc. It would change.
    it('Test the pool initially returns zero once contract is created', async () => {
        let poolSize = await myContract.pool 
        assert.equal(poolSize, '0')
    })

    //TODO: Test addToPool
    it("Test addToPool", async () => {
        let addedEntrant = await myContract.addToPool();
        //assert.equal(, , "");
    })

    //TODO: Test viewDeposit
    it("Test viewDeposit", async () => {
        let initialDeposit = myContract.addToPool();
        let viewedDeposit = await myContract.viewDeposit();
        assert.equal(initialDeposit, viewedDeposit, "Correct deposit should be displayed");
    })

    //TODO: Test withdrawAll so entrants can withdrawl savings
    it("Test withdrawAll", async () => {
        let addedEntrant = await myContract.addToPool();
        //assert.equal(, 0, "Entrant should have an account of 0");
    })

    //TODO: BELOW? HOW to test with address??
    it('Test a winner isn\'t chosen until the pool ends', async () => {
        assert.equal(await pool.winningAddress, '0x0000000000000000000000000000000000000000')
    })

    //TODO: Test that a winner has been chosen after endPool has been called. HOW to test with address??
    it("Test a winner has been chosen", async () => {
        //address winningAddress = myContract.chooseWinner();
        assert.notEqual(await pool.winningAddress, '0x0000000000000000000000000000000000000000')
    })
});