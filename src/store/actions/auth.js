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

export const authLogout = () => {
    localStorage.removeItem('tokenId')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actions.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime*1000)
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
            const expirationDate = new Date(new Date().getTime() +  response.data.expiresIn * 1000) 
            localStorage.setItem('tokenId',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(checkAuthTimeout(response.data.expiresIn))
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            

        }).catch((error) =>{
            dispatch(authFail(error.response.data.error))

        })
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('tokenId')
        if(!token){
            dispatch(authLogout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))


            if(expirationDate < new Date() ){
                dispatch(authLogout())
            }
            else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    }

}