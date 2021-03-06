import React, { Component } from 'react'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import classes from './Auth.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }


    componentDidMount(){
        console.log(this.props.buildingBurger)
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()

        }
    }

    checkValidity = (value, rules) => {
        let isValid = true


        if (rules.required) {
            isValid = value.trim() !== ''

        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid

    }

    inputHandlerChange = (event,controlName) =>{
        const updatedControlForm = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].rules),
                touched:true
            }
        }

        this.setState({
            controls:updatedControlForm
        })

    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        
    }

    switchAuthModeHandler = () =>{
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }


    render() {
        let formElementsArray = []

        for (let key in this.state.controls) {
            formElementsArray.push({
                key: key,
                config: this.state.controls[key]
            })
        }

        let authRedirect = null

        if(this.props.isAuthenticate){
            console.group(this.props.authRedirectPath)
            authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>
        }
            

        let form = formElementsArray.map((formElement) => {
            return (
                <Input
                    key={formElement.key}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.rules}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputHandlerChange(event, formElement.key)} />
            )

        })

        let errorMessage = null

        if(this.props.error)
             errorMessage = <p> {this.props.error.message} </p>

        if(this.props.loading)
            form = <Spinner/>

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType='Success'> SUBMIT</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}> SWITCH TO  {this.state.isSignUp ? 'SIGN IN' : ' SIGN UP'} </Button>
                

            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Auth)