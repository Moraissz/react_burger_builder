import React, {Component} from 'react'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component{

    state ={
        ingredients:{}
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for(let param of query.entries()){
            ingredients[param[0]] = Number(param[1])
        }
        this.setState({
            ingredients
        })
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