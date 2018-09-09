import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './app_component';
import LoginForm from './components/login';
import Home from './components/home';
import Admin from './components/admin';
import { requireAuth, checkAuth } from './actions/index';

export default (
	<Route path="/" component={AppComponent} onEnter={checkAuth}>
        <IndexRoute component={Home} onEnter={requireAuth}></IndexRoute>
       {/*<Route path="home" component={Home} title="Home" onEnter={requireAuth} />*/}
        <Route path="login" component={LoginForm} title="Login" />
        <Route path="admin" component={Admin} title="Admin" onEnter={requireAuth} />
    </Route>
);    