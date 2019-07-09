import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import MyButton from '../utils/MyButton';

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
        },100) //100 is amount of time from number to number. Higher numbers would be slower.
    }


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
                            <h3>Purchase before the next pool</h3>
                            <p><strong>What are the chances of winning?</strong><br />
                            Your chances of winning depends on how much you save/how many tickets are sold before the Pool locks. For example, if 1,000 savings tickets are sold before the Pool locks and you bought 100 tickets, your chances of winning would be 10%.</p>
                            <MyButton
                                text="Purchase tickets"
                                bck="red"
                                color="#ffffff"
                                link="#"
                            />
                        </div>
                    </Slide>
                </div>
            </div>
        );
    }
}

export default Discount;