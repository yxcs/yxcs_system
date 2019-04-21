import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage'


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
