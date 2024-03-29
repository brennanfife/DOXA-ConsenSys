import React, { Component } from 'react'
import Slide from 'react-reveal/Slide' // library for the countdown 

class Countdown extends Component {

    state = {
        deadline: 'Aug, 31, 2019',
        days:'0',
        hours:'0',
        minutes:'0',
        seconds:'0'
    }

    getTimeUntil(deadline){ 
        const time = Date.parse(deadline) - Date.parse(new Date()); //calculate new date
        if(time < 0) {
            console.log('Date passed')
        } else {
            const seconds = Math.floor((time/1000)%60);
            const minutes = Math.floor((time/1000/60)%60);
            const hours = Math.floor((time/(1000*60*60))%24);
            const days = Math.floor(time/(1000*60*60*24));

            this.setState({
                days, //key and value are the same so don't need todo days: days
                hours,
                minutes,
                seconds
            })
        }
      
    }

    componentDidMount(){
        setInterval(()=> this.getTimeUntil(this.state.deadline),1000) // gets the state 
    }

    render() {
        return (
            <Slide left delay={1000}> {/** Slide left and delay*/}
                <div className='countdown_wrapper'>
                    <div className='countdown_top'>
                        Next lottery ends in...
                    </div>
                    <div className='countdown_bottom'>
                    <div className='countdown_item'>
                        <div className='countdown_time'>
                            {this.state.days}
                        </div>
                        <div className='countdown_tag'>
                            Days
                        </div>
                    </div>
                    <div className='countdown_item'>
                        <div className='countdown_time'>
                            {this.state.hours}
                        </div>
                        <div className='countdown_tag'>
                            Hrs
                        </div>
                    </div>
                    <div className='countdown_item'>
                        <div className='countdown_time'>
                            {this.state.minutes}
                        </div>
                        <div className='countdown_tag'>
                            Min
                        </div>
                    </div>
                    <div className='countdown_item'>
                        <div className='countdown_time'>
                            {this.state.seconds}
                        </div>
                        <div className='countdown_tag'>
                            Sec
                        </div>
                    </div>
                </div>
                </div>
            </Slide>
        )
    }
}

export default Countdown