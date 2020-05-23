import React, {Component} from 'react'

import Burger from '../components/Burger/Burger'
import Aux from '../hoc/Aux'

class BurguerBuilder extends Component{

    state = {
        ingredients:
        {
            salad:1,
            cheese:2,
            bacon:2,
            meat:2
        }
    }
    render() {
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <div>Burguer Controls</div>
            </Aux>
        )
    }
}

export default BurguerBuilder;