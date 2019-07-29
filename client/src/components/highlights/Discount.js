import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import MyButton from '../utils/MyButton';

//! ADDED LINES BELOW FROM TRUFFLE-BUTTON
// import PrizedLinkedContract from "../contracts/PrizedLinkedContract.json";
// import getWeb3 from "../utils/getWeb3";
//! ADDED LINES ABOVE FROM TRUFFLE-BUTTON

class Discount extends Component {

    state = {
        discountStart: 0,
        discountEnd: 20,
        storageValue: 0, //? Correct?
        web3: null, //? Correct?
        accounts: null, //? Correct?
        contract: null//? Correct?
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

    //? ADDED LINES BELOW FROM TRUFFLE-BUTTON

    async handleClick(event){
        // const contract = this.state.contract
        // const account = this.state.accounts[0]
        // var value = 3
        // await contract.methods.set(value).send({ from: account })
        // const response = await contract.methods.get().call()
        // console.log('response:', response)
    }
    //? ADDED LINES ABOVE FROM TRUFFLE-BUTTON

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
                        <button onClick={this.handleClick.bind(this)}>Join Pool</button>
                        //! ADDED LINE ABOVE FROM TRUFFLE-BUTTON */}
                        </div>
                    </Slide>
                </div>
            </div>
        );
    }
}

export default Discount;