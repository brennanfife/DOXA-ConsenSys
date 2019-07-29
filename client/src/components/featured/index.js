import React from 'react'
import Carousel from './Carousel'
import Countdown from './Countdown'

const Featured = () => {
    return (
        <div style={{position: 'relative'}}>
            <Carousel />
            <div className='artist_name'>
                <div className='wrapper'>
                    Scroll ↓ to Begin
                </div>
                {/* //!Added Correctly?
                <div>The current pool size is: {this.props.poolSize}</div>
                console.log('poolSize:', poolSize) */}
            </div>
            <Countdown />
        </div>
    )
}

export default Featured
