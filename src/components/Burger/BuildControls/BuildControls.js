import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl) => {
                return <BuildControl label={ctrl.label}
                    key={ctrl.label}
                    added={() => props.addIngredient(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                ></BuildControl>
            })}

            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>{ props.isAuthenticate ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>

        </div>
    )

}


export default buildControls