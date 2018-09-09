import axios from "axios";
import { SET_AUTH_DATA } from "./types";
import store from '../utils/store';

export function setAuthData (auth) {
    return {
      type: SET_AUTH_DATA,
      auth
    };
}

export const logout = () => {
    setTokenToAxios();
    localStorage.removeItem('auth');
    window.location.href = '/login';
}

export const requireAuth = (nextState, replace, callback) => {
    const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).jwtToken : null;
    const req = axios.get("/validate?authToken="+accessToken);
    
    req.then(resp => {
        if(!resp || resp.data.sucess === false){
            logout();
            replace({ pathname: '/login', query: { return_url: nextState.location.pathname } });
        }
        else 
            callback();
    })
    // .catch(error => {
    //     debugger
    //     console.log(error);
    //     logout();
    //     replace({ pathname: '/login', query: { return_url: nextState.location.pathname } });
    // });
}

export const userAuthenticate = (authObj) => {
    const req = axios.post("/authenticate", authObj);
    return dispatch => {
        return req.then((response) => {
            if(response && response.status == 200) {
                const { auth } = response.data;
                if(auth){
                    setTokenToAxios(auth.jwtToken);
                    localStorage.setItem('auth', JSON.stringify(auth));
                    dispatch(setAuthData(auth));
                    //window.location.href = '/home';
                }
            }
        });
    }
}

export const userSignUp = (authObj, callback) => {
    const req = axios.post("/signup", authObj);

    return req.then((response) => {
        if(response && response.data.sucess) {
            callback(null, "user added sucessfully");
        }
        else {
            if(response.data.message) callback(response.data.message);
            else callback("error signup unsucessful");
        }
    });
}

export const checkAuth = (nextState, replace, callback) => {
    const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).jwtToken : null;

    if(accessToken) {
        store.dispatch(setAuthData(JSON.parse(localStorage.getItem('auth'))));
        setTokenToAxios(accessToken);
        callback();
    }
    else
        callback();

}

export const setTokenToAxios = (token) => {
    if (token) {
      axios.defaults.headers.common["authToken"] = token;
    } else {
      delete axios.defaults.headers.common["authToken"];
      // window.location.reload();
    }
};
  