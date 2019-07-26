import React from 'react';
import Fade from 'react-reveal/Fade';

const Description = () => {
    return (
        <Fade>
            <div className="center_wrapper">
                <h2>What is DOXA?</h2>
                <div className="highlight_description">
                DOXA is an web application, providing users with prized-linked savings accounts. <strong>When a DOXA pool is open</strong>, you can save as much as you want. Each amount saved represents a chance to win the lottery pool. All of what you put in the starting pool, will be given back when the pool ends. <strong>When a pool is locked</strong>, no savings can be put in or withdrawn from that pool. All the funds in the pool are lent to begin earning interest. <strong>When a pool is complete</strong>, you can withdraw all your money! Additionally, one winner is randomly chosen among the ticket holders, funding them the interest that accrued during the lock period.
                </div>
            </div>
        </Fade>
    );
};

export default Description;