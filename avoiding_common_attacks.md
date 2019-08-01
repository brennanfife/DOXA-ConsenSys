Avoiding Common Attacks
===

## Index
- [Integer Overflow and Underflow](#integer-overflow-and-underflow)
- [TimeStamp Dependence](#timestamp-dependence)
- [Reentrancy](#reentrancy)
- [DoS](#dos)
- [Additional Recommendations](#additional-recommendations)
    - [Explicit with function and variable visibility](#explicit-with-function-and-variable-visibility)
    - [Using latest pragma possible](using-latest-pragma-possible)

## Integer Overflow and Underflow
If particular variables reach above the maximum uint value (2^256), it will circle back to zero, causing a faulty in our code. The same is true for underflow. If a uint is made to be less than zero, it will cause underflow and get set to its maximum value.
However, by using OpenZeppelin's SafeMath.sol library for uint, we can address this attack as it provides safety checks that will revert on error. Note that it could be better to import this library from a GitHub repo (should any updates occur.

## TimeStamp Dependence
We would like to make sure in future iterations of our contract that we avoid using 'now' or 'block.timestamp'
The reason is that these have the potential to be manipulated by the miner. 
However, as long as we are aware that they exist, and are NOT basing some critical/time-sensitive logic (within several minutes)on them, which we aren't, we should be fine.

## Reentrancy
We can address reentrancy by adopting check-effect-interaction patterns. Including a check if the pool is open, or if the new entrant exists by checking the pool first before adding them as a new entrant.  

## DoS
With denial of service, there could be pieces of code that causes our contract to become unusable.  One is to know that we aren't looping in the contract, causing any unexpected revert. We can also use our fallback function (which is commented out as it is now automatically implemented in solidity 0.5.0) which will make sure we still have a running program, even if we call an incorrect function, specify the wrong parameters, etc. 

## Additional Recommendations
### Explicit with function and variable visibility
We include visibility in our variables, most of which should be public in our case.
### Using latest pragma possible
In PrizedLinkedContract, instead of using pragma solidity ^0.5.0, we use pragma solidity 0.5.8. As pointed out in [SmartDec](https://smartdec.net/), it is better to use the latest, specific versions of pragma for security purposes. At the time of this dApp, 0.5.10 is the latest version, but 0.5.8 is the most updated version which is compatible with Truffle.