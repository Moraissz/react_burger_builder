import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData,
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }

}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData).then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        
        }).catch((error) => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

const fetchOrdersStart = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

const fetchOrdersFail = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = () =>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json').then((res) =>{
            const fetchedOrders = []
            for(let key in res.data){
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            

        }).catch((error) =>{
            dispatch(fetchOrdersFail())
        })
    }
}