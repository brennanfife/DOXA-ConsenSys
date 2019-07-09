import React from 'react';
import Fade from 'react-reveal/Fade';

const Footer = () => {
    return (
        <footer className="bck_red">
            <Fade delay={500}>
                <div className="font_righteous footer_logo_venue">DOXA</div>
                <div className="footer_copyright">
                    Prize-linked savings accounts: All Open Source. All on the Blockchain.
                </div>
            </Fade>
        </footer>
    );
};

export default Footer;