import React from 'react'
import classes from './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {

    const isAuthenticate = props.isAuthenticate ? 
    <NavigationItem link='/logout'>Logout</NavigationItem> : <NavigationItem link='/auth'>Authenticate</NavigationItem>
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {isAuthenticate}
    </ul>)
    

}

export default navigationItems