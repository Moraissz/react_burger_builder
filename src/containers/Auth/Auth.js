import React, { Component } from 'react'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.css'

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

    render() {
        let formElementsArray = []

        for (let key in this.state.controls) {
            formElementsArray.push({
                key: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map((formElement) => {
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

        return (
            <div className={classes.Auth}>
                {form}
                <Button btnType='Success'> SUBMIT</Button>

            </div>
        )
    }


}


export default Auth