import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../main.less'
//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component{
    componentWillMount(){
        let  isAuthenticated =  localStorage.getItem("J_TOKEN") ? true :false;
        this.setState({isAuthenticated:isAuthenticated})
        if(!isAuthenticated){
          const {history} = this.props;
          let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            history.replace("/login");
          }, 1000)
        }
    }
    render(){
        let { component: Component,path="/",exact=false,strict=false} = this.props;
        return this.state.isAuthenticated ?  (
            <Route  path={path} exact={exact}  strict={strict}  render={(props)=>( <Component {...props} /> )} />
        ) : (
          <div className="login-tips">请登陆后访问</div>
        );
    }
}
PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  component: PropTypes.func.isRequired
}
export default withRouter(PrivateRoute);