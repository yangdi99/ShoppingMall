import React,{ Component } from 'react';
import Home from '../views/home';
import Mine from '../views/Mine';
import Cart from '../views/Cart';
import Catagary from '../views/Catagary';
import Detail from '../views/detail';
import Login from '../views/login';
import Index from '../views/index';
import Search from '../views/search';
import Register from '../views/register';
import Result from '../views/result';
import Setting from '../views/setting';
//404
import NoMatch from '../views/route404/nomatch';
let router = {
    routes: [
        // {
        //     component: NoMatch
        // },
        {
            path: '/detail',
            component: Detail,
            exact: true
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/setting',
            component: Setting
        },
        {
            path:"/index",
            component: Index,
            children:[
                {
                    path:"/index/home",
                    component: Home
                },
                {
                    path:"/index/catagory",
                    component: Catagary
                },
                {
                    path:"/index/cart",
                    component: Cart,
                    authorization: true
                },
                {
                    path:"/index/mine",
                    component: Mine,
                    authorization: true
                },
                {
                    path:"/index/search",
                    component: Search
                },
                {
                    path:"/index/result",
                    component: Result
                }
            ]
        }
    ]
}

export default router;