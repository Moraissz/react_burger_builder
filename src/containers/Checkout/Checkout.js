import React, {Component} from 'react'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{

    state ={
        ingredients:null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query.entries()){

            if(param[0] === 'price'){
                price = param[1]

            }else{
                ingredients[param[0]] = Number(param[1])
            }
            
        }
        this.setState({
            ingredients,
            price
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
                <Route path={this.props.match.path + '/contact-data'} render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price}/>} />
            </div>
            
        )
    }
    
}

export default Checkout