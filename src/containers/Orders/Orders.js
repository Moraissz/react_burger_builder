import React, {Component} from 'react'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state = {
        loading:true,
        orders:[]
    }

    componentDidMount(){
        axios.get('/orders.json').then((res) =>{
            const fetchedOrders = []
            for(let key in res.data){
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                })
            }
            this.setState({
                loading:false,
                orders: fetchedOrders
            })
            

        }).catch((error) =>{
            this.setState({
                loading:false
            })

        })
    }

    render(){
        console.log(this.state.orders)
        let orders = this.state.orders.map((order) =>(<Order ingredients={order.ingredients} key={order.id} price={order.price}/>))

        return(
            <div>
                {orders}
            </div>
        )
    }


}

export default withErrorHandler(Orders,axios)