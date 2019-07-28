import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import MyButton from '../utils/MyButton';

//! ADDED LINES BELOW FROM TRUFFLE-BUTTON
// import PrizedLinkedContract from "./contracts/PrizedLinkedContract.json";
// import getWeb3 from "./utils/getWeb3";
//! ADDED LINES ABOVE FROM TRUFFLE-BUTTON

class Discount extends Component {

    state = {
        discountStart: 0,
        discountEnd: 20
    }

    percentage = () => {
        if(this.state.discountStart < this.state.discountEnd) {
            this.setState({
                discountStart: this.state.discountStart + 1
            })
        }
    }

    componentDidUpdate() { 
        setTimeout(()=>{ 
            this.percentage()
        },100) 
    }

    //! ADDED LINES BELOW FROM TRUFFLE-BUTTON
    // state = { storageValue: 0, web3: null, accounts: null, contract: null };

    // componentDidMount = async () => {
    //     try {
    //     // Get network provider and web3 instance.
    //     const web3 = await getWeb3();

    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();

    //     // Get the contract instance.
    //     const networkId = await web3.eth.net.getId();
    //     const deployedNetwork = SimpleStorageContract.networks[networkId];
    //     const instance = new web3.eth.Contract(
    //         SimpleStorageContract.abi,
    //         deployedNetwork && deployedNetwork.address,
    //     );

    //     // Set web3, accounts, and contract to the state, and then proceed with an
    //     // example of interacting with the contract's methods.
    //     this.setState({ web3, accounts, contract: instance }, this.runExample);
    //     } catch (error) {
    //     // Catch any errors for any of the above operations.
    //     alert(
    //         `Failed to load web3, accounts, or contract. Check console for details.`,
    //     );
    //     console.error(error);
    //     }
    // };
    // runExample = async () => {
    //     const { accounts, contract } = this.state;
    
    //     // Stores a given value, 5 by default.
    //     await contract.methods.set(15).send({ from: accounts[0] });
    
    //     // Get the value from the contract to prove it worked.
    //     const response = await contract.methods.get().call();
    
    //     // Update state with the result.
    //     this.setState({ storageValue: response });
    //   };
    // async handleClick(event){
    //     const contract = this.state.contract
    //     const account = this.state.accounts[0]
    //     var value = 3
    //     await contract.methods.set(value).send({ from: account })
    //     const response = await contract.methods.get().call()
    //     console.log('response:', response)
    // }
    //! ADDED LINES ABOVE FROM TRUFFLE-BUTTON

    render() {
        return (
            <div className="center_wrapper">
                <div className="discount_wrapper">
                    <Fade
                        onReveal={()=> this.percentage()} //trigger 'percentage' when the component loads to the screen
                    >
                        <div className="discount_percentage">
                            <span>{this.state.discountStart}%</span>
                            <span>CHANCES</span>
                        </div>
                    </Fade>
                    
                    <Slide right>
                        <div className="discount_description">
                            <h3>Save before the next pool</h3>
                            <p><strong>What are the chances of winning?</strong><br />
                            Your chances depend on how much you save before the pool locks. For example, if 100 ETH is allocated in the pool before it locks, and you saved 10 ETH, your chances of winning would be 10%.</p>
                            <MyButton
                                text="Join This Pool!"
                                bck="red"
                                color="#ffffff"
                            />

                        {/* //! ADDED LINE BELOW FROM TRUFFLE-BUTTON
                        <button onClick={this.handleClick.bind(this)}>Set Storage</button>
                        //! ADDED LINE ABOVE FROM TRUFFLE-BUTTON */}
                        </div>
                    </Slide>
                </div>
            </div>
        );
    }
}

export default Discount;