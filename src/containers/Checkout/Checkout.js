import React, {Component} from 'react'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component{

    state ={
        ingredients:{
            meat:1,
            salad:0,
            cheese:2,
            bacon:1,
        }
    }

    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    render(){


        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                checkoutContinued={this.checkoutContinuedHandler} 
                checkoutCancelled={this.checkoutCancelledHandler} ></CheckoutSummary>
            </div>
        )
    }
    
}

export default Checkout