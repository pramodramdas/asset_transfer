import axios from "axios";
import store from '../utils/store';

export const getMyAssets = (callback) => {
    const { empId } = store.getState().auth;
    let body = {
        "where":{"owner":"resource:org.acme.transfer.Employee#"+empId}
    }
    const req = axios.post("/getComodity", body);

    req.then((response)=>{
        if(response.status == 200 && response.data.message){
            callback(response.data.message);
        }
        else
            callback([]);
    })
    .catch((e) => {
        console.log("error please try again");
        callback([]);
    });
}

export const getTransactions = (assetId, callback) => {
    const req = axios.post("/getTransactions");
    let body = {
        "where":{"commodity": "resource:org.acme.transfer.Commodity#"+assetId}
    }
    req.then((response)=>{
        if(response.status == 200 && response.data.message){
            callback(response.data.message);
        }
        else
            callback([]);
    })
    .catch((e) => {
        console.log("getTransactions error please try again");
        callback([]);
    });
}

export const getTransactionsCouch = (assetId, pageNo, callback) => {
    let body = { assetId, pageNo };
    const req = axios.post("/getTransactionsCouch", body);
    console.log(1);
    req.then((response)=>{
        console.log(2);
        if(response.status == 200 && response.data.message){
            callback(response.data.message);
        }
        else
            callback([]);
    })
    .catch((e) => {
        console.log("getTransactions error please try again");
        callback([]);
    });
}