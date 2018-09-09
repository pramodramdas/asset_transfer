import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import routes from "./routes";
import store from "./utils/store";
import axios from "axios";
//import 'antd/dist/antd.css';
//import './generic.css';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 || error.response.status === 403)
        window.location.href = '/login';
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);