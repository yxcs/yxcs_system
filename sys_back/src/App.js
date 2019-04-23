import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import LoginPage from './pages/login/LoginPage'
import LayoutPage from './pages/LayoutPage'

import './App.css'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <PrivateRoute path="/" component={LayoutPage}/>
      </Switch>
    )
  }
}

export default App;