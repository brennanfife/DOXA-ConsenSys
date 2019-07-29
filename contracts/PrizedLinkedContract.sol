pragma solidity ^0.5.0;

import "./SafeMath.sol";

/**
 * @title The PrizedLinkedContract.sol contract for DOXA
 * @author Brennan Fife
 * @notice PrizedLinkedContract is the main contract for our system.
 * Users will be able to save money every month, with each month raffling off the interest
 * generated from the collective pool of savers.
 * @dev This is the barebones for a prize-linked lottery system.
 * Eventually, this contract would look to add additional features, including:
 * Adding compadability with Coinbase Wallet, using Compound Finance for lending + Dai,
 * and Rhombus Network to provide us with uniformly random numbers.
 */
contract PrizedLinkedContract {
    using SafeMath for uint;

    address payable public owner;
    uint public pool; // pool size, WHICH defaults to 0
    uint public MINIMUM_AMOUNT = 10 finney; // MUST save at least 0.01 ether
    address payable[] public entrants;
    mapping (address => uint) public savings; // amount of each savings.
    bool public isOpen;
    uint public creationTime; // current blocktime stamp
    address payable public winningAddress;
    bool public contractPaused = false; //circuit breaker variable
    // uint public interestGenerated;
    // mapping (address => uint) public entryMap; // list the map of entrants.


   /**
    * Emitted when a new pool is created. Should it contain the pool address?
    */
    event PoolCreated(address creator);

   /**
    * Emitted when a saver is added to the pool
    * @param saver The new saver added
    * @param deposit The amount they deposit
    * @param total The total they are currently saving
    */
    event AddedEntry(address indexed saver, uint deposit, uint total, uint pool);

   /**
    * Emitted when an entrant withdraws from the pool
    * @param saver The address of the saver who is withdrawing
    * @param savings The amount that has been withdrawn
    */
    event Withdrawn(address indexed saver, uint savings);

   /**
    * Emitted when lockPool is called
    */
    event PoolLocked(uint timeLocked, address locker);

   /**
    * Emitted when a winner is chosen.
    * @param winner The reandomly selected winner
    */
    event ChosenWinner(address indexed winner);

   /**
    * Emitted when closePool is called.
    * @param winnings The winner's lottery winning
    */
    event PoolClosed(uint winnings);





    modifier isOwner {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    modifier poolOpen {
        require(isOpen == true, "Pool must be open");
        _;
    }

    modifier minAmount {
       require(msg.value >= MINIMUM_AMOUNT, "Must submit at least the minimum amount");
       _;
    }

    modifier requiredTimePassed {
        require((block.timestamp - creationTime) > 4 weeks, "4 weeks must have passed");
        _;
    }

    // If the contract is paused, stop the modified function
    modifier checkIfPaused() {
        require(contractPaused == false, "Circuit breaker must be false");
        _;
    }





    constructor() public {
        owner = msg.sender;
        isOpen = true;
        creationTime = block.timestamp;
        emit PoolCreated(owner);
    }

   /**
    * @notice This function adds new entrants to the current pool.
    * An entrant can only join when the isOpen = true.
    * @dev The first require statement means to only add this entrant to potential winners if
    * their current balance 0.
    */
    function addToPool() public payable poolOpen() minAmount checkIfPaused {
        if (savings[msg.sender] == 0) entrants.push(msg.sender);
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit AddedEntry(msg.sender, msg.value, savings[msg.sender], pool);
    }

   /**
    * @notice This function allows users to see how much is in their savings.
    * @return The savings of the user
    */
    function viewDeposit() public view returns(uint) { // i.e. like a getDeposit
        return(savings[msg.sender]);
    }

   /**
    * @notice This function withdraws their savings from the current pool.
    * @dev This function currently withdraws ALL of the user's savings balance.
    */
    function withdrawAll() public {
        require(savings[msg.sender] > 0, "Entrant has nothing to withdraw");
        require(isOpen == true, "Pool not open");
        msg.sender.transfer(savings[msg.sender]);
        savings[msg.sender] = 0;
        emit Withdrawn(msg.sender, savings[msg.sender]);
    }

   /**
    * @notice This function locks the pool 2 weeks after it is created.
    * After pool is locked, the next two weeks will allow it to accrue interest.
    * @dev For testing purposes, the variable for the length of time will be changed.
    */
    function lockPool() public checkIfPaused {
        require((block.timestamp - creationTime) > 2 weeks, "Two weeks must have passed");
        isOpen = false;
        emit PoolLocked(block.timestamp, msg.sender); //since this function is public, anyone can call
    }

   /**
    * @notice This function randomly chooses the winner from the current savers.
    * It will make sure the current pool is locked.
    * @return The winning address selected.
    */
    function chooseWinner() public checkIfPaused returns (address) {
        require(isOpen == false, "Pool must be locked before selecting winner");
        require(entrants.length >= 2, "There must be 2 or more players in the current pool");
        uint randomNumber = selectRandom();
        uint entrantsRandomIndex = randomNumber.mod(entrants.length);
        winningAddress = entrants[entrantsRandomIndex];
        emit ChosenWinner(winningAddress);
        return winningAddress;
    }

   /**
    * @notice This function selects a random number by returning the blockhash of the current block.number.
    * @dev This would eventually be replaced with a random oracle generator e.g. Rhombus
    * @return The random number returned to chooseWinner.
    */
    function selectRandom() internal view returns (uint256) {
        return uint256(blockhash(block.number));
    }

   /**
    * @notice This function closes the pool, simulating one month has passed.
    * A winner should have been chosen and they had the interest transfered to them.
    * 20 represents a 5% interest rate from the entire pool. Here it is hard coded, but would be where a call to
    * a Compound contract would make sense.
    * @dev Need to add the modifier requiredTimePassed to the end of the function header.
    * Additionally, a new instance of the PrizedLinkedContract should be created to start up a new pool,
    * yet keeping the current savers in the pool.
    */
    function closePool() public checkIfPaused {
        require(winningAddress != address(0), "Winner should be declared before closing pool");
        isOpen = false;
        winningAddress.transfer(savings[winningAddress].add(pool.div(20)));
        emit PoolClosed(pool.div(20));
    }





    // /**
    // * @notice This function is the fallback function.
    // */
    // function() external {
    //     revert("Fallback function called");
    // }

    /**
    * @notice This function is the circuit breaker function using a ternary.
    */
    function togglePause() public isOwner {
        contractPaused = !contractPaused;
    }
}