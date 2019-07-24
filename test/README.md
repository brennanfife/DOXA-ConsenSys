Tests to include and why
1. Test that the minimum submitted amount per entrant is 10 finney 

1a. Test getDeposit

2. When endPool is called, a winner must be chosen.

3. The person who is selected always gets the pot of interest

4. The current savings remaining in savers accounts after the lottery

5. The correct length of time will pass before the contract is locked up and a winner is chosen.

Can include a before (which will run once before the unit tests), after, beforeEach, and an afterEach.
With before, we begin with 0 ether.