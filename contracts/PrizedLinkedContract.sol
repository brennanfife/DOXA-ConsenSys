pragma solidity ^0.5.0;

import "./SafeMath.sol";

/**
 * @title The PrizedLinkedContract.sol contract for DOXA
 * @author Brennan Fife
 * @notice ...
 * @dev ...
 */
contract PrizedLinkedContract {
    using SafeMath for uint;
    address payable public owner;
    uint public pool; // pool size, WHICH defaults to 0
    uint public MINIMUM_AMOUNT = 10 finney; // MUST save at least 0.01 ether
    address payable[] public entrants;
    mapping (address => uint) private savings; // amount of each savings.
    mapping (address => uint) public entryMap; // list the map of entrants.
    bool public isOpen;
    uint public creationTime; // current blocktime stamp
    uint public interestGenerated;
    address payable public winningAddress;

   /**
    * Emitted when a new pool is created. Should it contain the pool address?
    * param nameOfParam(s)
    */
    event PoolCreated();

   /**
    * Emitted when a saver is added to the pool
    * param nameOfParam(s)
    */
    event AddedEntry(address indexed saver, uint deposit, uint total);

   /**
    * Emitted when an entrant withdraws from the pool
    * param nameOfParam(s)
    */
    event Withdrawn(address indexed saver, uint savings);

   /**
    * Emitted when lockPool is called
    * param nameOfParam(s)
    */
    event PoolLocked();

   /**
    * Emitted when a winner is chosen
    * param nameOfParam(s)
    */
    event ChosenWinner();

   /**
    * Emitted when closePool is called
    * param nameOfParam(s)
    */
    event PoolClosed();

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

    constructor() public {
        owner = msg.sender;
        isOpen = true;
        creationTime = block.timestamp;
        emit PoolCreated();
    }

   /**
    * @notice This function adds new entrants to the current pool. 
    * An entrant can only join when the isOpen = true.
    * @dev The first require statement means to only add this entrant to potential winners if 
    * their current balance 0.
    */
    function addToPool() public payable poolOpen() minAmount {
        if (savings[msg.sender] == 0) entrants.push(msg.sender);
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit AddedEntry(msg.sender, msg.value, savings[msg.sender]);
    }

   /**
    * @notice This function allows users to see how much is in their savings.
    * @return The savings of the user
    */
    function viewDeposit() public view returns(uint) { // i.e. like a getDeposit
        return(savings[msg.sender]);
    }

   /**
    * @notice This function allows users to withdraw their savings from the current pool
    */
    function withdraw() public {
        !!!!!
        emit Withdrawn(msg.sender, );
    }

   /**
    * @notice This function locks the pool 2 weeks after it is created.
    * After pool is locked, the next two weeks will allow it to accrue interest.
    * @dev For testing purposes, the variable for the length of time will be changed.
    */
    function lockPool() public { 
        require((block.timestamp - creationTime) > 2 weeks, "Two weeks must have passed");
        isOpen = false;
        emit PoolLocked();
    }

   /**
    * @notice This function randomly chooses the winner from the current savers. 
    * It will make sure the current pool is locked.
    * @return The winning address selected.
    */
    function chooseWinner() public returns (address) {
        require(isOpen == false, "Pool must be locked before selecting winner");
        uint randomNumber = selectRandom();
        uint entrantsRandomIndex = randomNumber.mod(entrants.length);
        emit ChosenWinner();
        return winningAddress = entrants[entrantsRandomIndex];
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
    function closePool() public { 
        require(winningAddress != address(0), "Winner should be declared before closing pool"); 
        isOpen = false;
        winningAddress.transfer(savings[winningAddress].add(pool.div(20)));
        emit PoolClosed();
    }
}