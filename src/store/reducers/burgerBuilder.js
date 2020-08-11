import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTS_PRICE = {
    meat: 4,
    salad: 1,
    bacon: 2,
    cheese: 2

}

const addIngredient = (state, action) => {
    const updatedIngredient = updateObject({ [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const upIngredient = updateObject({ [action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
    const upIngredients = updateObject(state.ingredients, upIngredient)
    const upState = {
        ingredients: upIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
    }
    return updateObject(state, upState)

}

const setIngredients = (state,action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: initialState.totalPrice,
        error: false
    })
}

const fetchIngredientsFailed = (state,action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action)
        default: return state;
    }

}

export default reducer

