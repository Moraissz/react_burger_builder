import React, {Component} from 'react'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order'

class Orders extends Component{

    state = {
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json').then((res) =>{
            this.setState({
                loading:false
            })
            const fetechedOrders = []
            for(let key in res.data){
                fetechedOrders.push({
                    id: key,
                    ...res.data[key]
                })
            }
            console.log(fetechedOrders)

        }).catch((error) =>{
            this.setState({
                loading:false
            })

        })
    }

    render(){
        return(
            <div>
                <Order/>
                <Order/>
            </div>
        )
    }


}

export default Orders