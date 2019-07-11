Additions/Fixes to PrizedLinkedContracts.sol
- functions:
    - Able to purchase tickets
    - Generate randomly chosen winner (eventually with the help of Rhombus)
    - Pick a winner
    - Accrue interest
    - Provide winnings
    - Check if user if already in pool (if so, add their new savings)
    - Check users current savings
    - Check current pool size
    - Refund/remove user and user's savings
    - setState (for testing)
    - Return state of pool

A contract for the token (i.e. name, ticker, supply, etc.), importing OpenZep

Separate contracts for a single pool instance vs a pool creator (i.e. setup). 

A contract for the random number 