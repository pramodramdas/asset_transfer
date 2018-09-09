import axios from "axios";
import store from '../utils/store';
import { SET_ASSET } from './types';

export function setAsset (content) {
    return {
      type: SET_ASSET,
      content
    };
}

export const submitAsset = (data, callback) => {
    const req = axios.post("/addAsset", data);
    req.then((response)=>{
        if(response.status == 200 && response.data.message){
            callback("assert "+data.assetId+" added sucessfully");
        }
        else
            callback(response.data.error);
    })
    .catch((e) => {
        callback("error please try again");
    });
}

export const requestForAsset = (data, callback) => {
    const state = store.getState();
    const reqDate = Object.assign({},data,{reqEmp: state.auth.empId});
    const req = axios.post("/requestAsset", reqDate);
    
    req.then((response)=>{
        if(response.status == 200 && response.data.mesage){
            callback("request for asset "+data.assetId+" placed sucessfully");
        }
        else
            callback(response.data.error);
    })
    .catch((e) => {
        callback("error please try again");
    });
}

export const getRequests = (empId, type, query, callback) => {
    const queryString = Object.keys(query)
        .map((key) => { 
            return "&"+key+"="+query[key]
        }).join("");
        
    const req = axios.get("/getMyRequests?empId="+empId+"&type="+type+queryString);
    req.then((response)=>{
        if(response.status == 200 && response.data.sucess){
            callback(response.data.requests);
        }
        else
            callback([]);
    })
    .catch((e) => {
        console.log(e);
        callback([]);
    });
}

export const changeRequestState = (key, value, obj, callback) => { 
    let url = "";
    let message = "";
    let errorMsg = "";
    let { reqEmp, assetId, requestId } = obj;
    const state = store.getState();
    
    if(key === 'approved') {
        url = "/approveRequest";
        message = "approve successfull";
        errorMsg = "Error approve unsuccessful";
    }
    else if(key === 'isClosed') {
        url = "/closeRequest";
        message = "Request sucessfully closed";
        errorMsg = "Error close unsuccessful";
    }
    else if(key === 'received') {
        url = "/receiveAsset";
        message = "received successfull";
        errorMsg = "Error receive unsuccessful";
    }
    else if(key === 'cancel') {
        url = "/cancelRequest";
        message = "cancellation successfull";
        errorMsg = "Error cancel unsuccessful";
    }

    const req = axios.post(url, {assetId, reqEmp, requestId, cancel:state.auth.empId});
    req.then((response)=>{
        if(response.status == 200 && response.data.sucess){
            callback(null, message);
        }
        else {
            errorMsg = response.data.error ? response.data.error : errorMsg;
            callback(errorMsg, null);
        }
    })
    .catch((e) => {
        console.log(e);
        callback(errorMsg, null);
    });
}

export const searchAsset = (filter, callback) => {
    const req = axios.post("/searchAsset", filter);
    req.then((response)=>{
        if(response.status == 200 && response.data.sucess == true){
            callback(response.data.data);
        }
        else {
            console.log(response);
            callback([]);
        }
    })
    .catch((e) => {
        callback([]);
    });
}

export const searchAssetAdmin = (filter) => {
    const req = axios.post("/searchAssetAdmin", filter);
    return (dispatch) => {
        return req.then((response)=>{
            if(response.status == 200 && response.data.sucess == true){
                dispatch(setAsset({assets: response.data.message}));
            }
            else {
                console.log(response);
                dispatch(setAsset({assets: []}));
            }
        })
        .catch((e) => {
            console.log(e);
            dispatch(setAsset({assets: []}));
        });
    }
}

export const assetTransactionsMonth = (state, callback) => {
    let filter = Object.assign({}, state);
    const req = axios.post("/assetTransactionsMonth", filter);

    req.then((response)=>{
        if(response.status == 200 && response.data.sucess == true){
            callback(response.data.data);
        }
        else {
            console.log(response);
            callback([]);
        }
    })
    .catch((e) => {
        console.log(e);
        callback([]);
    });
}