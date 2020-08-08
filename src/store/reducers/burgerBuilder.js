import * as actionTypes from '../actions/actionTypes'

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
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                    },
                    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
                }
            
            case actionTypes.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
                    },
                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
                }
            case actionTypes.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients: action.ingredients,
                    totalPrice:initialState.totalPrice,
                    error:false
                }
            
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:true
                }
                
            default:
                return state;
        }
        
}

export default reducer

