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

    // CONSTRUCTOR
    constructor() public {
        owner = msg.sender;
    }
}

/* contract PrizedLinkedContract {

    // VARIABLES
    address public owner;
    address[] public entrants;
    creationTime = now;
    mapping (address => uint) savings; // amount of each savings
    mapping (address => uint) entryMap; // list the number of entrants
    uint pool = 0; // pool size
    uint min = 10 finney; // 0.01 ether

    // EVENTS
    event addedEntry(address indexed saver, uint deposit, uint total); // Emitted when a saver is added to the pool
    event withdraw(address indexed saver, uint savings); // Emitted when a saver withdraws
    event checkSavings(States state); // Emitted when someone requests to know how much someone is saving...?

    // MODIFIERS
    modifier isOwner {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    // CONSTRUCTOR
    constructor() public {
        owner = msg.sender;
        creationTime = now;
    }

    // States of Contract:
        //isOpen: Accepting
        //payOut: Withdraw

    enum States {
        isOpen,  //0
        payOut     //1
    }

    // FUNCTIONS

    // When a new saver joins the pool, saver can add to deposit during isOpen
    function addToPool() public payable atState(States.isOpen) {
        require(msg.value >= min, "Must submit at least the minimum amount");
        addEntrant(msg.sender);
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit addedEntry(msg.sender, msg.value, savings[msg.sender]);
    }

    // Add an entrant to the pool
    function addEntrant (address entrant) private {
        if (savings[entrant] == 0) {
          //Only add to potential winners if current balance 0
          entrants.push(entrant);
          entryMap[entrant] = entrants.length - 1;
        }
        //else
    }

    function calcWinner() private view returns (address) {}

    function endPool() public isOwner {
        myEvent.isOpen = false;
        uint balanceTransfered = myEvent.sales * TICKET_PRICE;
        owner.transfer(balanceTransfered);
        emit LogEndSale(owner, balanceTransfered);
    }

} */