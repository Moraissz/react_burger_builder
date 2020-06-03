import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer:false
        })

    }

    sideDrawerOpenedHandler = () =>{
        this.setState({
            showSideDrawer:true
        })
    }

    
    render() {
        return (
            <Aux>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} ></SideDrawer>
                <Toolbar clicked ={this.sideDrawerOpenedHandler}></Toolbar>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout