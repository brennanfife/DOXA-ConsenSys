pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./RandomNumberGenerator.sol";

/**
 * @title The PrizedLinkedContract.sol contract for DOXA
 * @author Brennan Fife
 * @notice ...
 * @dev ...
 */
contract PrizedLinkedContract {

    using SafeMath for uint;

    address payable public owner;
    uint pool; // pool size, WHICH defaults to 0
    uint MIN_TICKET_PRICE = 10 finney; // MUST save at least 0.01 ether
    address payable[] public entrants;
    mapping (address => uint) savings; // amount of each savings
    mapping (address => uint) entryMap; // list the map of entrants. Not safe...// struct? for entrant's address and savings amount... id number
    bool isOpen;
    uint creationTime; // current blocktime stamp
    uint interestGenerated;
    address payable winningAddress;

    // EVENTS
    event poolCreated(); // Emitted when a new pool is created. Should it contain the pool address?
    event addedEntry(address indexed saver, uint deposit, uint total); // Emitted when a saver is added to the pool
    event withdraw(address indexed saver, uint savings); // Emitted when a saver withdraws
    event nextPoolPhase(); // or...
    event logEndSale();



    // MODIFIERS
    modifier isOwner {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    modifier poolOpen {
        require(isOpen == true, "Pool must be open");
        _;
    }

    modifier minAmount {
       require(msg.value >= MIN_TICKET_PRICE, "Must submit at least the minimum amount");
       _;
    }

    modifier requiredTimePassed {
        require((block.timestamp - creationTime) > 4 weeks, "One month must have passed"); //4 weeks to simulate a month has passed
        _;
    }



    // CONSTRUCTOR
    constructor() public {
        owner = msg.sender;
        isOpen = true;
        creationTime = block.timestamp; // 'now' is changing every time a new block is created. Here it makes creationTime static to that current time.
    }


    // FUNCTIONS
    // When a new saver joins the pool, saver can add to deposit during isOpen
    function addToPool() public payable poolOpen() minAmount { // SHOULD THIS BE public as anyone should be able to call it
        if (savings[msg.sender] == 0) entrants.push(msg.sender); //Only add to potential winners if current balance 0
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit addedEntry(msg.sender, msg.value, savings[msg.sender]);
    }

    function removeFromPool() public payable returns (address) {}

    function viewDeposit() public view returns(uint) {
        return(savings[msg.sender]);
    }

    function poolSize() public view returns(uint) {}

    function selectRandom() internal view returns (uint256) { // WOULD EVENTUALLY BE REPLACED BY RHOMBUS
        return uint256(blockhash(block.number.sub(1))); // blockhash is good enough for demo purposes.
    }

    function chooseWinner() public returns (address) {
        require(isOpen == false, "Pool must be closed before selecting winner");
        uint randomNumber = selectRandom();
        uint entrantsRandomIndex = randomNumber.mod(entrants.length); //SafeMath
        return winningAddress = entrants[entrantsRandomIndex];
    }

    function closePool() public { // this should happen every 2 weeks
        require((block.timestamp - creationTime) > 2 weeks, "Two weeks must have passed");
        isOpen = false;
    }

    function endPool() public requiredTimePassed {
        require(winningAddress != address(0), "Winner should be declared before closing pool"); // Requires chooseWinner has been called.
        isOpen = false;
        winningAddress.transfer(pool.add(pool.div(20))); // 20 represents a 5% interest rate (hard coded)
        // emit LogEndPool();
    }
}