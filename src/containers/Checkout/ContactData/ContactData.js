import React, {Component} from 'react'
import classes from './ContactData.css'

import axios from '../../../axios-orders'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import Button  from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state ={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value: '',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value: '',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zip Code'
                },
                value: '',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value: '',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                rules:{},
                valid:true
            },            
        },
        formIsValid:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true})

        let formData ={}
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value

        }

        const order = {
            ingredients: this.props.ings,
            price:this.props.price,
            orderData:formData
        }

       

        this.props.onOrderBurger(order)
    }

    checkValidity = (value,rules) => {
        let isValid = true


        if(rules.required){
            isValid = value.trim() !== ''
           
        }
        
        return isValid

    }

    inputHandlerChange = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedElementForm = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedElementForm.value = event.target.value
        updatedElementForm.valid =  this.checkValidity(updatedElementForm.value,updatedElementForm.rules)
        updatedElementForm.touched = true
        updatedOrderForm[inputIdentifier] = updatedElementForm

        let formIsValid = true

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({
            orderForm:updatedOrderForm,
            formIsValid
        })


        

    }

    render(){
        let formElementsArray = []

        for(let key in this.state.orderForm){
            formElementsArray.push({
                key: key,
                config:this.state.orderForm[key]
            })
        }


        let form = (<form>
                        
                        {formElementsArray.map((formElement) => {
                            return (
                                <Input 
                                key={formElement.key}
                                elementType={formElement.config.elementType}  
                                elementConfig={formElement.config.elementConfig} 
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.rules}
                                touched = {formElement.config.touched}
                                changed={(event) => this.inputHandlerChange(event,formElement.key)} />
                            )
                        })}
                        <Button btnType={'Success'} disabled={!this.state.formIsValid} clicked={this.orderHandler}> ORDER</Button>
                    </form>)

        if(this.props.loading){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}> 
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)) 
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));