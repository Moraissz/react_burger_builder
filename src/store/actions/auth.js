import * as actions from './actionTypes'


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
    }
}