import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }


    updatePurchaseState = (updatedIngredients) => {
        const ingredients = Object.keys(updatedIngredients).map((igName) => {
            return updatedIngredients[igName]

        })

        const sum = ingredients.reduce((sum, actualItemPrice) => {
            return sum + actualItemPrice;
        })

        
           return sum > 0
        
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticate){
            this.setState({ purchasing: true })
        }

        else{
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
        
    }



    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls addIngredient={this.props.onIngredientsAdded}
                        removeIngredient={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuthenticate = {this.props.isAuthenticate}
                    ></BuildControls>
                </Aux>)
            orderSummary = (<OrderSummary ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}></OrderSummary>)
        }

        return (
            <Aux>
                <Modal visible={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticate: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientsAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientsRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));