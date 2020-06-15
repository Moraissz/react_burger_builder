import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/' component={BurgerBuilder}/>
            <Route path='/order' component={Orders}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
