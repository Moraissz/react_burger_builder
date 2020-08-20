import * as actions from './actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (idToken,userId) => {
    return{
        type: actions.AUTH_SUCCESS,
        idToken: idToken,
        userId:userId
    }
}

const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error
    }
}

export const auth = (email,password,isSignUp) => {
    return (dispatch) => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKSwRRTwi614PjcoR0w15CF_1bL-ZdeOs'
        if(!isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKSwRRTwi614PjcoR0w15CF_1bL-ZdeOs'
        axios.post(url,authData)
        .then((response)=>{
            dispatch(authSuccess(response.data.idToken,response.data.localId))

        }).catch((error) =>{
            dispatch(authFail(error.response.data.error))

        })
    }
}