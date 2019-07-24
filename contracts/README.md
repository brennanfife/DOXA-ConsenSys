Additions/Fixes to PrizedLinkedContracts.sol
- functions:
- Implement a circuit breaker! Make this clear!
- Shouldn't we require that atleast 1 or 2 people exist in the pot before it closes?

Make sure to add viewable updating timer, savings, and pool pot

Make a note that blockhash is good enough for demo purposes in comments

Need a fallback function???
Need to add the modifier requiredTimePassed to the end of the function header

MODIFICATIONS
Turned 'savings' variable from public to private to keep it protected.
Changed 'closePool' to 'poolLocked'
Changed 'endPool' to 'closePool'