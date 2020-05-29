import React from 'react'

import classes from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {

    const allClasses = [classes.Modal]

    props.visible ? allClasses.push(classes.IsVisible) : allClasses.push(classes.IsInvisible)

    return (
        <Aux>
            <Backdrop visible={props.visible} clicked={props.modalClosed}/>
            <div className={allClasses.join(' ')}>

                {props.children}

            </div>
        </Aux>
    )
}

export default modal