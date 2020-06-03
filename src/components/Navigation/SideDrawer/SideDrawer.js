import React from 'react'
import classes from './SideDrawer.css'
import Aux from '../../../hoc/Aux'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer,classes.Close]

    if(props.show)
        attachedClasses = [classes.SideDrawer,classes.Open]

    return (
        <Aux>
            <Backdrop visible={props.show} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>

                <nav>
                    <NavigationItems></NavigationItems>
                </nav>

            </div>
        </Aux>
    )

}

export default sideDrawer