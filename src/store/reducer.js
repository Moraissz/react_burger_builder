import * as actionTypes from './actions'

const initialState  = {
    ingredients:{
        salad:0,
        cheese:0,
        meat:0,
        bacon:0,
    },
    totalPrice:4
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
                
            default:
                return state;
        }
        
}

export default reducer
