import React from 'react'
import classes from './Order.css'

const order = () =>{
    return(
    <div className={classes.Order}>
        <p>Salad: (1)</p>
        <p>Price: <strong> R$ 5.00</strong> </p>
    </div>
    )
}

export default order