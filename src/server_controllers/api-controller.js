const Requests = require('../database/models/request_queue');
const assetRegistry = require('../database/models/asset');
const Dept = require('../database/models/department');
let getAssetStatus = require('../database/queries/getAssetStatus');
//const mongoose = require('mongoose');

const getMyRequests = (req, res) => {
    let query = {};
    let { empId, assetId, type, approved, received, isClosed } = req.query;
    if(empId && type==="others_request")
        query = {owner:empId};
    else
        query = empId ? {reqEmp:empId} : {reqEmp:null};
    //query prameters will be string so approved, received will enter inside regardless of true or false
    if(approved) query.approved = (approved === 'true') ? true : false;
    else if(received) query.received = (received === 'true') ? true : false;
    else if(isClosed) query.isClosed = (isClosed === 'true') ? true : false;

    if(assetId) query.assetId = assetId;

    Requests.find(query,{"_id":0,"__v":0})
    .then(function(data){
        res.status(200).send({sucess:true, requests:data});
    })
    .catch(function(err){
        console.log(err);
        res.status(200).send({sucess:false});
    });
}

const searchAsset = (req, res) => {
    let { assetId, description } = req.body;
    if(assetId || description) {
        let query = {};
        if(assetId) query.assetId = assetId;
        if(description) query = {$text: {$search: description.toLowerCase()}};
        
        getAssetStatus[0].$match = query;
        
        assetRegistry.aggregate(getAssetStatus)
        .then(function(data){
            res.status(200).send({sucess:true, data});
        })
        .catch(function(err){
            console.log(err);
            res.status(200).send({sucess:false});
        });
    }
    else {
        res.status(200).send({sucess:false});
    }
}

const assetTransactions = (req, res) => {
    let { assetId, startDate, endDate } = req.body;
    let query;

    if(assetId && startDate && endDate) {
        query = {
            assetId: assetId, 
            $or:[
                {receivedDate: {$gte:startDate,$lte:endDate}},
                {submittedDate: {$gte:startDate,$lte:endDate}},
            ]
        }

        Requests.find(query,{"_id":0,"__v":0})
        .then(function(data){
            res.status(200).send({sucess:true, data});
        })
        .catch(function(err){
            console.log(err);
            res.status(200).send({sucess:false});
        });
    }
    else
        res.status(200).send({sucess:false});
}

const getDepts = (req, res) => {
    Dept.find({},{"_id":0,"__v":0})
    .then(function(data){
        console.log(data);
        res.status(200).send({sucess:true, data});
    })
    .catch(function(err){
        console.log(err);
        res.status(200).send({sucess:false});
    });
}

module.exports = {
    getMyRequests,
    searchAsset,
    assetTransactions,
    getDepts
}