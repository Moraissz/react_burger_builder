import React from 'react'
import classes from './CheckoutSummary.css'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'


const checkoutSummary = (props) => {
    
    const style ={
        width: '100%',
        margin:'auto'
    }
    
    return(
        <div className={classes.CheckoutSummary}>
            <h1> We hope it tastes well!</h1>
            <div style={style}> 
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            
            <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>

        
    )
}

export default checkoutSummary