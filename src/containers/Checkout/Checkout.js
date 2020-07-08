import React, {Component} from 'react'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{



    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    render(){


        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings} 
                checkoutContinued={this.checkoutContinuedHandler} 
                checkoutCancelled={this.checkoutCancelledHandler} ></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
            
        )
    }
    
}


const mapStateToProps = (state) =>{
    return{
        ings: state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout)