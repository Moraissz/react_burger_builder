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
import * as burgerBuilderActions from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then((response) => {
            this.setState({
                ingredients: response.data
            })
        }).catch((error) => {
            this.setState({
                error: true
            })
        })
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


    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        
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

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>

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
                    ></BuildControls>
                </Aux>)
            orderSummary = (<OrderSummary ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}></OrderSummary>)
        }

        if (this.state.loading)
            orderSummary = (<Spinner></Spinner>)

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
        ings:state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientsAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientsRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));