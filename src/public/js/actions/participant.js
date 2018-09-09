import axios from "axios";
import { SET_PARTICIPANT, SET_ASSET } from './types';
import store from '../utils/store';
import { message } from 'antd';

export function setParticipant (content) {
    return {
      type: SET_PARTICIPANT,
      content
    };
}

export function setItem (action, content) {
    return {
      type: action,
      content
    };
}

export const submitParticipant = (data, callback) => {
    const req = axios.post("/addParticipant", data);
    req.then((response)=>{
        if(response.status == 200 && response.data.message){
            callback("participant "+data.name+" added sucessfully");
        }
        else
            callback(response.data.error);
    })
    .catch((e) => {
        callback("error please try again");
    });
}

export const getParticipants = (filter) => {
    let { empId, name, email, role, department } = filter;
    let data = {empId, name, email, role, department};
    const req = axios.post("/searchParticipant", data);
    
    return (dispatch) => {
        return req.then((response)=>{
            if(response.status == 200 && response.data.message){
                dispatch(setParticipant({participants: response.data.message}));
            }
            else {
                console.log(response.data.error);
                dispatch(setParticipant({participants: []}));
            }
        })
        .catch((e) => {
           console.log(e);
           dispatch(setParticipant({participants: []}));
        });
    }
}

export const removeItem = (params) => {
    let {index, itemCopy, path, action, type} = params;
    const req = axios.post(path, itemCopy[index]);
    return (dispatch) => {
        return req.then((response)=>{
            if(response.status == 200 && response.data.message){
                if(response.data.message.n > 0){
                    message.success(type+' deleted sucessfully');
                    itemCopy.splice(index);
                }
            }
            else {
                console.log(response.data.error);
                message.error(response.data.error);
            }
            dispatch(setItem(action, {[type]: itemCopy}));
        })
        .catch((e) => {
           console.log(e);
           dispatch(setItem(action, {[type]: itemCopy}));
        });
    }
}

export const deleteItem = (index, type) => {
    const state = store.getState();
    let params = {index,type};

    if(type === 'participants') {
        params.itemCopy = state.participant.participants.slice(0);
        params.path = "/deleteParticipant";
        params.action = SET_PARTICIPANT;
    }
    else if(type === 'assets') {
        params.itemCopy = state.asset.assets.slice(0);
        params.path = "/removeAssetAdmin";
        params.action = SET_ASSET;
    }
    return removeItem(params);
}