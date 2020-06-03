import React from 'react'
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div>Menu</div>
        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </div>
)

export default toolbar
