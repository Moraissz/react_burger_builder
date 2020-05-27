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
        totalPrice: 4
    }

     addIngredientHandler = (type) => {
        const newIngredientQuantity = this.state.ingredients[type] + 1;
        const ingredients = {
            ...this.state.ingredients,    
        }
        ingredients[type] = newIngredientQuantity
        console.log(ingredients)
        this.setState({
            ingredients
        })
        this.updatePrice(type,'add')



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
                
                ></BuildControls>
            </Aux>
        )
    }
}

export default BurguerBuilder;