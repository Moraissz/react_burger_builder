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

    render(){


        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}></CheckoutSummary>
            </div>
        )
    }
    
}

export default Checkout