import React, { Component } from 'react'

import classes from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.visible !== this.props.visible
    }
    render(){
        const allClasses = [classes.Modal]

        this.props.visible ? allClasses.push(classes.IsVisible) : allClasses.push(classes.IsInvisible)
        return(
            <Aux>
            <Backdrop visible={this.props.visible} clicked={this.props.modalClosed}/>
            <div className={allClasses.join(' ')}>

                {this.props.children}

            </div>
        </Aux>
        )
    }

}

export default Modal