import React from 'react'
import classes from './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {

    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticate ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        {props.isAuthenticate ? 
    <NavigationItem link='/logout'>Logout</NavigationItem> : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>)
    

}

export default navigationItems