import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch,withRouter } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {connect } from 'react-redux'
import * as actions from './store/actions/auth'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/' component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null,mapDispatchToProps) (App));
