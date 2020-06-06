import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux/Aux'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENTS_PRICE = {
    meat: 4,
    salad: 1,
    bacon: 2,
    cheese: 2

}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
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

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const newIngredientQuantity = this.state.ingredients[type] + 1;
        const ingredients = {
            ...this.state.ingredients,
        }
        ingredients[type] = newIngredientQuantity
        this.setState({
            ingredients
        })
        this.updatePrice(type, 'add')
        this.updatePurchaseState(ingredients)



    }

    removeIngredientHandler = (type) => {
        const ingredientsCount = this.state.ingredients[type]
        if (ingredientsCount <= 0) {
            return
        }
        const newIngredientQuantity = this.state.ingredients[type] - 1;
        const ingredients = {
            ...this.state.ingredients,
        }
        ingredients[type] = newIngredientQuantity
        this.setState({
            ingredients
        })
        this.updatePrice(type, 'sub')
        this.updatePurchaseState(ingredients)
    }

    updatePrice = (type, operation) => {
        let newPrice = 0

        if (operation === 'add') {
            newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        }
        else {
            newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        }
        this.setState({
            totalPrice: newPrice
        })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            costumer: {
                name: 'Lucas',
                address: {
                    street: 'Av Barão louco',
                    zipCode: '444-332',
                    country: 'Brazil'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order).then((response) => (
            this.setState({
                loading: false,
                purchasing: false
            })
        )).catch((error) => {
            this.setState({
                loading: false,
                purchasing: false
            })
        })

    }



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>

        if (this.state.ingredients) {
            burger = (
                <Aux>                
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    ></BuildControls>
                </Aux>)
            orderSummary = (<OrderSummary ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);