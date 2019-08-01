Design Patterns Decisions
===

## Index
- [Contract structure](#contract-structure)
	- [Restricting Access - Modifiers](#restricting-access---modifiers)
	- [Emergency Stop - Circuit Breaker](#emergency-stop-circuit-breaker)
	- [Mappings & Constants](#mappings-&-constants)
	- [Library](#library)
    - [State Machine](#state-machine)
    - [Other](#other)

## Contract structure
```
Contracts
|___Identity.sol
|___SafeMath.sol
```

### Restricting Access - Modifiers
We will use modifiers in our smart contract should we wish to restrict various functions. These modifiers include checking that the owner of the contract is the one making such a call. 

The concept of 'fail early, fail loud' should be noted here. We make sure that when our functions fail, we implement the proper require statements early on to address such issues.

Additionally, to enable the emergency stop, we used `checkIfPaused` to make sure there were no emergency stops.

*When testing the project in localhost, we needed to edit the require statement in lockPool. This is because we wouldn't be able to make a contract call with it being implemented.*

### Emergency Stop - Circuit Breaker
We use the isOwner modifier to make sure only the manager/owner of this contract can call the toggle pause to enable an emergency stop. This is critical because should a problem occur, one needs to be able to stop our contract from carrying out any wrong or malicious actions. 
This will make certain functions such as chooseWinner uncallable, while other functions, like withdrawAll or viewDeposit will be (as entrants will still need access). We don't need to implement this stop in other contracts like SafeMath.sol

### Mappings & Constants
Mapping can be a useful security tip for solidity. Here, we use it to map over the entrants to see how much each has saved. 
Additionally, we would like for future iterations to be able to generate real interest. This, in order to allow for enough interest to be generated during each month's pool period, we would require enough Finney has been deposited to allow for a worthy game.

### Library
To save us from having to duplicate our code, we can use OpenZeppelin's SafeMath library to allow us to access several important arithmetic functions. This is critical when we need to do certain operations such as using 'mod' to choose a winner.

### State Machine
Different periods exist within our contract. Initially, the contract will be open, accepting people who would like to begin saving for the current month. After two weeks has passed (or however long should the creator of the contract decide), the pool is locked up. Then, an additional two weeks will need to pass, allowing the pool to generate additional interest.
It is important to note that while these times are arbitrarily chosen, extending them from months to years may be something to experiment with... Forcing entrants to save even longer.

## Other
Upgradability
While I was unable to get it properly working, in future iterations we would expect an oracle service (such as the Rhombus Network) to be incredibly useful here. This would include access to the Rhombus Oracle, which helps generate uniformly random numbers. In this dApp, we would be able to quickly replace the 'selectRandom' function from PrizedLinkedContract.sol with a call to the Rhombus oracle. 