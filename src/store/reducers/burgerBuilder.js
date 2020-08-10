import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../utility'

const initialState  = {
    ingredients:null,
    totalPrice:4,
    error:false
}

const INGREDIENTS_PRICE = {
    meat: 4,
    salad: 1,
    bacon: 2,
    cheese: 2

}

const reducer = (state = initialState,action) => {
        switch(action.type){
            
            case actionTypes.ADD_INGREDIENT:
                const updatedIngredient = updateObject({[action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
                const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
                const updatedState = {
                    ingredients: updatedIngredients,
                    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
                }
                return updateObject(state,updatedState)
            
            case actionTypes.REMOVE_INGREDIENT:
                const upIngredient = updateObject({[action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
                const upIngredients = updateObject(state.ingredients,upIngredient)
                const upState = {
                    ingredients: upIngredients,
                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
                }
                return updateObject(state,upState)
            case actionTypes.SET_INGREDIENTS:
                return updateObject(state,{
                    ingredients: action.ingredients,
                    totalPrice:initialState.totalPrice,
                    error:false})
                
            
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return updateObject(state,{error:true})
                
            default:
                return state;
        }
        
}

export default reducer

