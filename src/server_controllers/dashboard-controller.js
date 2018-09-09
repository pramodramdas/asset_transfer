const mongoose = require('mongoose');
const Participant = require('../database/models/participant');
const Asset = require('../database/models/asset');
let getRequestByDateCat = require('../database/queries/getRequestByDateCat.json');
let getTotalRequests = require('../database/queries/getTotalRequestByCat.json');
let getAssetsByDepartment = require('../database/queries/getAssetsByDepartment.json');

const getTimeSeriesData = (req, res) => {
    let { fromDate, toDate } = req.body;
    let cond = {};

    fromDate = fromDate || new Date(0).getTime();
    toDate = toDate ||  new Date().getTime();
    cond = { 
        "$and":[{"$gte":["$$item.requestDate", fromDate]}, 
        {"$lte":["$$item.requestDate", toDate]}] 
    }
    
    getRequestByDateCat[2].$project.request_array.$filter.cond = cond
    
    Asset.aggregate(getRequestByDateCat)
    .then((data) => {
        res.send(data);
    })
    .catch((e) => {
        console.log(e);
        res.send([]);
    });
}

const getTotalRequestsByCat = (req, res) => { 
    Asset.aggregate(getTotalRequests)
    .then((data) => {
        res.send(data);
    })
    .catch((e) => {
        console.log(e);
        res.send([]);
    });
}

const getAssetsByDept = (req, res) => { 
    Participant.aggregate(getAssetsByDepartment)
    .then((data) => {
        res.send(data);
    })
    .catch((e) => {
        console.log(e);
        res.send([]);
    });
}

module.exports = {
    getTimeSeriesData,
    getTotalRequestsByCat,
    getAssetsByDept
}