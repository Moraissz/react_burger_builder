import React from 'react'
import classes from './SideDrawerButton.css'

const sideDrawerButton = (props) => (

    <button onClick={props.clicked} className={classes.SideDrawerButton}>
        <span className={classes.ToggleButtonBar}></span>
        <span className={classes.ToggleButtonBar}></span>
        <span className={classes.ToggleButtonBar}></span>
    </button>
)

export default sideDrawerButton