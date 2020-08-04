import * as actionsTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) =>{
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

const setIngredients = (ingredients) =>{
    return {
        type : actionsTypes.SET_INGREDIENTS,
        ingredients
    }
}

const fetchIngredientsFailed = () =>{
    return{
        type: actionsTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then((response) => {
            dispatch(setIngredients(response.data));
        }).catch((error) => {
            dispatch(fetchIngredientsFailed());
        })
    }
}