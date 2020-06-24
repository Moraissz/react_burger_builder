import React, {Component} from 'react'
import classes from './ContactData.css'

import axios from '../../../axios-orders'
import {withRouter} from 'react-router-dom'

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
                value: ''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value: ''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value: ''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zip Code'
                },
                value: ''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value: ''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                }
            },            
        },

        
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true})

        let order ={}
        for(let formElement in this.state.orderForm) {
            order[formElement] = this.state.orderForm[formElement].value

        }


        axios.post('/orders.json',order).then((response) => {
            this.setState({
                loading:false
            })
            this.props.history.push('/')
        }).catch((error) => {
            this.setState({
                loading:false,
            })
        }) 

    }

    inputHandlerChange = (event,inputIdentifer) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedElementForm = {
            ...updatedOrderForm[inputIdentifer]
        }

        updatedElementForm.value = event.target.value
        updatedOrderForm[inputIdentifer] = updatedElementForm
        this.setState({
            orderForm:updatedOrderForm
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
                                changed={(event) => this.inputHandlerChange(event,formElement.key)} />
                            )
                        })}
                        <Button btnType={'Success'} clicked={this.orderHandler}> ORDER</Button>
                    </form>)

        if(this.state.loading){
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

export default withRouter(ContactData);