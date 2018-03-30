import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import { getCookie } from '../utils/utils';
function isLogin () {
    return !!getCookie('token')
}

class RouteWrapper extends Component {
    render() {
        const { routes } = this.props
        return (
            <Switch>
                {
                    routes.map((item, index) => {
                        return <Route exact={item.exact} path={item.path} key={index} render={(location) => {
                            return item.authorization && !isLogin()
                            ? <Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>
                            : <item.component {...location} routes={item.children} ></item.component>
                        }}></Route>
                })}
            </Switch>
        )
    }
}
export default RouteWrapper