import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'; //Allows us to add the logo
//import IconButton from '@material-ui/core/IconButton';
//import AddIcon from '@material-ui/icons/Add';
// import SideDrawer from './SideDrawer'

class Header extends Component {

    state = {
        // drawerOpen: false, // Initially, passing down to SideDrawer component
        headerShow: false // Allows us to make a transparent nav background. Then on scroll it appears. Appears in ternary
    }

    componentDidMount() { // For headerShow and backgroundColor. 
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => { // For headerShow and backgroundColor.
        if (window.scrollY > 0) {
            this.setState({
                headerShow: true
            })
        } else {
            this.setState({
                headerShow: false
            })
        }
    }

    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
    }

    render() {
        return (
            <AppBar 
                position="fixed"
                style={{
                    backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent',
                    padding: '10px 0px' // 10px up and down, 0px left and right
                }}
            >
                <Toolbar> 
                    <div className='header_logo'>
                        <div className='font_righteous header_logo_doxa'>DOXA</div>
                        <div className='header_logo_title'>Prize-Linked Savings Accounts</div>
                    </div>
                    {/* <IconButton
                        aria-label='Add'
                        color='inherit'
                        onClick={() => this.toggleDrawer(true)}
                    >
                        <AddIcon />
                    </IconButton> */}
                    {/* <SideDrawer 
                        open={this.state.drawerOpen} // Now, to use this in SideDrawer, use 'props.open'
                        onClose={(value) => this.toggleDrawer(value)}
                    /> */}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header