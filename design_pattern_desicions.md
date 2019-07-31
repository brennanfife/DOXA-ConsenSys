1. Fail early and fail loud
- We make sure that when our functions fail, we implement proper require statements to address such concerns. 
- These are implemented as early as possible

2. Circuit breaker
- We implement a circuit breaker to make sure the contract will stop in case of an emergency.

3. Upgradability
- While not directly implemented in this contract, in future iterations we would be able to import Rhombus.
- This would include the Rhombus oracle, generating uniformly random numbers.