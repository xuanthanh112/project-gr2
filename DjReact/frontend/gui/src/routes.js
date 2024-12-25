import React from "react";
import {Route} from 'react-router-dom';
import ArticleList from "./containers/ArticleListView";
import ArticleDetail  from "./containers/ArticleDetailView";
import NormalLoginForm from './containers/Login';
import NormalSignupForm from './containers/Signup';

const BaseRouter =()=>[
    <div>
        <Route exact path='/' component={ArticleList} /> 
        <Route exact path='/articles/:articleID/' component={ArticleDetail} />
        <Route exact path='/login/' component={NormalLoginForm} />
        <Route exact path='/signup/' component={NormalSignupForm} />

        


    </div>
];
export default BaseRouter