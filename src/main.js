import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'

//config router
import router from './router/router.config';
import { BrowserRouter,Switch,Redirect } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper';
import './static/css/reset.css'
import './static/css/common.css'
import './static/fonts/iconfont.css'
import font from  './utils/fontset';
//call react dom to render root
ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to="/index/home" />
            <RouteWrapper routes={router.routes}/>
        </Switch>
    </BrowserRouter>
</Provider>,
document.querySelector('#root'))