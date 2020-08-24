import React from 'react'
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawerButton from '../SideDrawer/SideDrawerButton/SideDrawerButton'

const toolbar = (props) => (
    <div className={classes.Toolbar}>

        <SideDrawerButton clicked={props.clicked}></SideDrawerButton>

        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticate= {props.isAuthenticate}></NavigationItems>
        </nav>
    </div>
)

export default toolbar
