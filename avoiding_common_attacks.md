Integer Overflow and Underflow
- If specific variables reaches above the maximum uint value (2^256), it will circle back to zero, causing a faulty in our code. The same is true for underflow. If a uint is made to be less than zero, it will cause an underflow and get set to its maximum value.
- However, by using OpenZeppelin's SafeMath.sol, we are able to address this attack as it provides safety checks that will revert on error.
- Note that it would be better to import this library directly from the GitHub repo (should any updates occur.

Reentrancy
- Addressed with push over pull
- Making sure that we clear before sending a transaction.

DoS
- With denial of service, there will be a piece of code that causes our contract to become unusable. The is true in
- Our fallback function (which is commented out as it is automatically implemented within 0.5.0) will make sure we can still have our contract working and reverts, even if we don't call an incorrect function, specify the wrong parameters, etc.

TimeStamp Dependence
- We would want to make sure in future iterations of our contract that we DO NOT use 'now' or 'block.timestamp'
- The reason is these have the potential to be manipulated by the miner. 
- However, as long as we are not basing some critical/time-sensitive logic (within several minutes) on block.timestamp, we should be fine.

