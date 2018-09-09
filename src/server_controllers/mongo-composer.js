const {
    getComodity,
    addComodity,
    checkEmployee,
    deleteComodity,
    getEmployee,
    addEmployee,
    deleteEmployee,
    getTransactions,
    submitTransaction
} = require('./composer-controller');

let commodity = {
    "$class": "org.acme.transfer.Commodity",
    "assetId": "",
    "description": "",
    "quantity": 1,
    "owner": "",
    "current_owner": ""
}

let employee = {
    "$class": "org.acme.transfer.Employee",
    "empId": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "department": ""
}

let transaction = {
    "$class": "org.acme.transfer.Transfer",
    "commodity": "",
    "temp_owner": ""   
}

const submitTransactionToLedger = (assetId, temp_owner) => {
    return new Promise((resolve, reject) => {
        let newTransaction = Object.assign({}, transaction);
        newTransaction.commodity = "resource:org.acme.transfer.Commodity#"+assetId;
        newTransaction.temp_owner = "resource:org.acme.transfer.Employee#"+temp_owner;

        submitTransaction(newTransaction, (err, response) => {
            if(!err) {
                resolve(response.data);
            }
            else {
                reject(err);
            }
        });
    });
}

const addAssetToLedger = (doc) => {
    return new Promise((resolve, reject) => {
        checkEmployee(doc.owner, (err, data) => {
            if(!err && data.status == '200') {
                let newCommodity = Object.assign({}, commodity);
                newCommodity.assetId = doc.assetId;
                newCommodity.description = doc.description;
                newCommodity.owner = "resource:org.acme.transfer.Employee#"+doc.owner;
                newCommodity.current_owner = newCommodity.owner;

                addComodity(newCommodity, (err, data) => {
                    if(!err) {
                        resolve(data);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                console.log(err);
                reject(err);
            }
        });
    });
}

const addParticipantToLedger = (doc) => {
    return new Promise((resolve, reject) => {
            checkEmployee(doc.empId, (err, data) => {
                console.log(data);
                if(!err && data.status == '404') {
                    let newEmployee = Object.assign({}, employee);
                    newEmployee.empId = doc.empId;
                    newEmployee.email = doc.email;
                    newEmployee.firstName = doc.name;
                    newEmployee.lastName = doc.name;
                    newEmployee.department = doc.department;

                    addEmployee(newEmployee, (error, result) => {
                        console.log(error);
                        if(!error) { 
                            resolve(result);
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                else {
                    //console.log(err);
                    reject(err);
                }
            });
    });
}

module.exports = {
    addAssetToLedger,
    addParticipantToLedger,
    submitTransactionToLedger
}