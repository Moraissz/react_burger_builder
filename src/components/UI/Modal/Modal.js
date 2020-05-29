import React from 'react'

import classes from './Modal.css'

const modal = (props) =>{

    const allClasses = [classes.Modal]
    
    props.visible ? allClasses.push(classes.IsVisible) :  allClasses.push(classes.IsInvisible)

    return (
    <div className={allClasses.join(' ')}>
        
        {props.children}
    
    </div>
    )
}

export default modal