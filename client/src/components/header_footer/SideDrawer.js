import React from 'react'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const SideDrawer = (props) => {

    return (
        <Drawer
            anchor="right"
            open={props.open} // Don't need to use this.props.open as this is stateless
            onClose={()=> props.onClose(false)}
        >
            <List component="nav">
                <ListItem button>
                    Buy entries
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideDrawer