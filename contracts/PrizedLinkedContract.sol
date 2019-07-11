pragma solidity ^0.5.0;

// import 'https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol'; // Can also just create a safe math contract and import it
// May use rhombus lighthouse here too
// import "./UniformRandomNumber.sol";

/**
 * @title The PrizedLinkedContract.sol contract for DOXA
 * @author Brennan Fife
 * @notice ...
 * @dev ...
 */
contract PrizedLinkedContract {

    // VARIABLES
    address public owner;
    bool isOpen;
    uint pool; // pool size, defaults to 0
    uint MIN = 10 finney; // 0.01 ether
    address[] public entrants;
    mapping (address => uint) savings; // amount of each savings
    mapping (address => uint) entryMap; // list the number of entrants
    //creationTime = now;


    // EVENTS
    event addedEntry(address indexed saver, uint deposit, uint total); // Emitted when a saver is added to the pool
    event withdraw(address indexed saver, uint savings); // Emitted when a saver withdraws
    event checkSavings(); // Emitted when someone requests to know how much someone is saving...?
    event logEndSale();


    // MODIFIERS
    modifier isOwner {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    modifier poolOpen {
        require(isOpen == true, "Pool must be open to add participant");
        _;
    }

    // CONSTRUCTOR
    constructor() public {
        owner = msg.sender;
        isOpen = true;
    }

    // When a new saver joins the pool, saver can add to deposit during isOpen
    function addToPool() public payable poolOpen() {
        require(msg.value >= MIN, "Must submit at least the minimum amount");
        if (savings[msg.sender] == 0) { //Only add to potential winners if current balance 0
          entrants.push(msg.sender);
        }
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit addedEntry(msg.sender, msg.value, savings[msg.sender]);
    }

    function calcWinner() private view returns (address) {} //declare winner here

    function endPool() public {
        require(winner != address(0), "Winner should be set before closing");
        isOpen = false;
        winner.transfer(pool);
        emit LogEndSale(owner, );
    }

}