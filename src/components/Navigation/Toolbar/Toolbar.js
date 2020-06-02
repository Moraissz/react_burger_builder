import React from 'react'
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo'

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div>Menu</div>
        <Logo></Logo>
        <nav> ... </nav>
    </div>
)

export default toolbar
