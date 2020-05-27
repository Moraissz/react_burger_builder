import React, {Component} from 'react'

import Burger from '../components/Burger/Burger'
import Aux from '../hoc/Aux'
import BuildControls from '../components/Burger/BuildControls/BuildControls'


const INGREDIENTS_PRICE = {
    meat: 4,
    salad: 1,
    bacon:2,
    cheese:2

}

class BurguerBuilder extends Component{

    state = {
        ingredients:
        {
            salad:0,
            cheese:0,
            bacon:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState = (updatedIngredients) =>{
        const ingredients = Object.keys(updatedIngredients).map((igName) =>{
            return updatedIngredients[igName]

        })

        const sum = ingredients.reduce((sum,actualItemPrice)=>{
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
        this.updatePrice(type,'add')
        this.updatePurchaseState(ingredients)



    }

    removeIngredientHandler = (type)=> {
        const ingredientsCount = this.state.ingredients[type]
        if(ingredientsCount <= 0){
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
        this.updatePrice(type,'sub')
        this.updatePurchaseState(ingredients)      
    }

     updatePrice = (type,operation) => {
        let newPrice = 0
        
        if(operation === 'add')
        {
             newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        }
        else{
             newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        }
        this.setState({
            totalPrice:newPrice
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <BuildControls addIngredient = {this.addIngredientHandler} 
                removeIngredient = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                
                ></BuildControls>
            </Aux>
        )
    }
}

export default BurguerBuilder;