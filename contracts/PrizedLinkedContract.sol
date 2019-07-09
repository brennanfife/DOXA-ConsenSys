pragma solidity ^0.5.0;

// import 'https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol';
// Can also just create a safe math contract and import it
// May use rhombus lighthouse here too




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
    // address[] public entrants;
    // creationTime = now;

    mapping (address => uint) savings; // amount of each savings
    mapping (address => uint) entryMap; // list the number of entrants

    // pool size and minimum
    uint pool = 0;
    uint min = 10 finney; //0.01 ether

    constructor() public {
        owner = msg.sender;
        //creationTime = now;
    }

    //States of Contract:
    //PoolOpen: Accepting
    //Saving: and Earning
    //PayOut: Withdraw

    enum States {
        PoolOpen,  //0
        Saving,    //1
        PayOut     //2
    }

    // EVENTS
    // Event emitted when a saver dives into the pool
    event splashDown(address indexed saver, uint deposit, uint total);

    // Event emitted when a saver withdraws
    event takeHome(address indexed saver, uint savings);

    event Saving(States state);


    //When a new saver joins the pool
    //Saver can add to deposit during PoolOpen
    function addToPool() public payable atState(States.PoolOpen) {

        require(msg.value >= min, "Must submit at least the minimum amount");
        addEntrant(msg.sender);
        pool = pool + msg.value;
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit splashDown(msg.sender, msg.value, savings[msg.sender]);
    }

    //Add entrant to pool
    function addEntrant (address entrant) private {
        if (savings[entrant] == 0) {
          //Only add to potential winners if current balance 0
          entrants.push(entrant);
          entryMap[entrant] = entrants.length - 1;
        }
        //Else: Already an active key
    }

} */