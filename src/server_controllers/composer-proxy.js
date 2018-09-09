const axios = require("axios");
const { getComodity,addComodity,deleteComodity,getEmployee,
    addEmployee,deleteEmployee,getTransactions,submitTransaction,getTransactionsFromCouch } = require('./composer-controller');

const composerPromise = (res, err, result) => {
    if(err)
        res.status(200).send({error: err});
    else
        res.status(200).send({message: result.data});
}

const getComodityProxy = (req, res) => {
    let { assetId } = req.query;
    getComodity(assetId, req.body, composerPromise.bind(null, res));
}

const addComodityProxy = (req, res) => {
    addComodity(req.body, composerPromise.bind(null, res));
}

const deleteComodityProxy = (req, res) => {
    let { assetId } = req.query;
    deleteComodity(assetId, composerPromise.bind(null, res));
}

const getEmployeeProxy = (req, res) => {
    let { empId } = req.query;
    getEmployee(empId, composerPromise.bind(null, res));
}

const addEmployeeProxy = (req, res) => {
    addEmployee(req.body, composerPromise.bind(null, res));
}

const deleteEmployeeProxy = (req, res) => {
    let { empId } = req.query;
    deleteEmployee(empId, composerPromise.bind(null, res));
}

const getTransactionsProxy = (req, res) => {
    let { txId } = req.query;
    getTransactions(txId, req.body, composerPromise.bind(null, res));
}

const submitTransactionProxy = (req, res) => {
    submitTransaction(req.body, composerPromise.bind(null, res));
}

const getTransactionsFromCouchProxy = (req, res) => {
    const { assetId, pageNo } = req.body; 
    const itemsPerPage = 5;
    if(assetId) {
        let filter = {
            "selector":{"data.timestamp":{"$gt":0},"data.commodity": "resource:org.acme.transfer.Commodity#"+assetId},
            "limit": itemsPerPage,
            "skip": (pageNo * itemsPerPage) - itemsPerPage,
            "sort":[{"data.commodity":"desc"},{"data.timestamp":"desc"}]
        }
        getTransactionsFromCouch(filter, composerPromise.bind(null, res));
    }
    else {
        composerPromise.bind(null, res, "error missing values")();
    }
}

module.exports = {
    getComodityProxy,
    addComodityProxy,
    deleteComodityProxy,
    getEmployeeProxy,
    addEmployeeProxy,
    deleteEmployeeProxy,
    getTransactionsProxy,
    getTransactionsFromCouchProxy,
    submitTransactionProxy
}