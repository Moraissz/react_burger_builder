import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'

import {connect} from 'react-redux'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
                <SideDrawer isAuthenticate= {this.props.isAuthenticate} show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} ></SideDrawer>
                <Toolbar isAuthenticate= {this.props.isAuthenticate} clicked ={this.sideDrawerOpenedHandler}></Toolbar>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticate: state.auth.token !== null
    }
}

export default connect(mapStateToProps) (Layout)