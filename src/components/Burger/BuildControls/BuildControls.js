import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
]

const BuildControls = (props) => {

    return (
        <div className={classes.BuildControls}> 
        
        {controls.map((ctrl) =>{
            return <BuildControl label={ctrl.label} 
            key={ctrl.label}
            added = {() => props.addIngredient(ctrl.type)}
            removed = {() => props.removeIngredient(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}
            ></BuildControl>
        })}

        </div>
    )

}


export default BuildControls