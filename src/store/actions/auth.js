import * as actions from './actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (authData) => {
    return{
        type: actions.AUTH_SUCCESS,
        authData
    }
}

const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error
    }
}

export const auth = (email,password) => {
    return (dispatch) => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken:true
        }
        
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKSwRRTwi614PjcoR0w15CF_1bL-ZdeOs',authData)
        .then((response)=>{
            console.log(response.data)
            dispatch(authSuccess(response.data))

        }).catch((error) =>{
            console.log(error)
            dispatch(authFail(error))

        })
    }
}