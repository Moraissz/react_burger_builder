import React, {Component} from 'react'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
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
        let summary = <Redirect to ='/'/>
        if(this.props.ings)
        {
            const purchasedRedirect  = this.props.purchased ? <Redirect to='/'/> : null
            summary  = (<div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings} 
                checkoutContinued={this.checkoutContinuedHandler} 
                checkoutCancelled={this.checkoutCancelledHandler} ></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>)
        }
            

        return summary;
    }
    
}


const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)