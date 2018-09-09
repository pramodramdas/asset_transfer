const axios = require("axios");

const getComodity = (assetId, filter ,callback) => {
    // {
    //     "$class": "org.acme.transfer.Commodity",
    //     "assetId": "2838",
    //     "description": "Iphone",
    //     "quantity": 0,
    //     "owner": "resource:org.acme.transfer.Employee#1731",
    //     "current_owner": "resource:org.acme.transfer.Employee#1731"
    // }
    let params = filter  ? encodeURIComponent(JSON.stringify(filter)) : ""; 
    
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Commodity/" + (assetId ? assetId : "");
    url = url + (params ? "?filter="+params : "");
    let request = axios.get("http://"+url);

    request.then((response) => {
        callback(null, response)
        //res.status(200).send(response);
    })
    .catch((err) => {
        console.log(err.message);
        callback(err, null)
        //res.status(200).send("error");
    });
}

const addComodity = (data, callback) => {
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Commodity/";
    let request = axios.post("http://"+url, data);

    request.then((response) => {
        callback(null, response)
    })
    .catch((err) => {
        console.log(err.response);
        callback(err, null);
    });
}

const deleteComodity = (assetId, callback) => {
    //let { assetId } = req.query;
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Commodity/" + (assetId ? assetId : "");
    let request = axios.delete("http://"+url);
    
    if(assetId) {
        request.then((response) => {
            callback(null, response)
        })
        .catch((err) => {
            console.log(err.response);
            callback(err, null);
        });
    }
    else {
        callback("error", null);
    }
}

const getEmployee = (empId, callback) => {
    // {
    //     "$class": "org.acme.transfer.Employee",
    //     "empId": "1731",
    //     "firstName": "Harish",
    //     "lastName": "Katti",
    //     "email": "harish@gmail.com",
    //     "department": "SES"
    // }
    //let { empId } = req.query;
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Employee/" + (empId ? empId : "");
    let request = axios.get("http://"+url);

    request.then((response) => {
        callback(null, response)
    })
    .catch((err) => {
        console.log(err.response);
        callback(err, null);
    });
}

const checkEmployee = (empId, callback) => {
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Employee/" + (empId ? empId : "");
    //url = "192.0.8.163:3000/api/Employee/" + (empId ? empId : "");
    let request = axios.head("http://"+url);
    request.then((response) => {
        console.log("Participant found "+response.status);
        callback(null, response)
    })
    .catch((err) => {
        console.log("Participant not found"+err.response.status);
        // 404 response means participant doesn't exist
        callback(null, err.response);
    });
}

const addEmployee = (data, callback) => {
    // {
    //     "$class": "org.acme.transfer.Employee",
    //     "empId": "string",
    //     "firstName": "string",
    //     "lastName": "string",
    //     "email": "string",
    //     "department": "string"
    // }
    //let { assetId } = req.query;
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Employee/";
    let request = axios.post("http://"+url, data);

    request.then((response) => {
        callback(null, response)
    })
    .catch((err) => {
        console.log('2');
        console.log(err.response);
        callback(err, null);
    });
}

const deleteEmployee = (empId, callback) => {
    //let { empId } = req.query;
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Employee/" + (empId ? empId : "");
    let request = axios.delete("http://"+url);
    
    if(empId) {
        request.then((response) => {
            callback(null, response)
        })
        .catch((err) => {
            console.log(err.response);
            callback(err, null);
        });
    }
    else {
        callback("error", null);
    }
}
//filter = {"where":{"commodity":"resource:org.acme.transfer.Commodity#2838"}}
//pass it in headers where "filter" is key
const getTransactions = (txId, filter, callback) => {
    // {
    //     "$class": "org.acme.transfer.Transfer",
    //     "commodity": "resource:org.acme.transfer.Commodity#2838",
    //     "temp_owner": "resource:org.acme.transfer.Employee#1731",
    //     "transactionId": "3c14a15436ffec4b3c4f84701db31df4bde091a5d9950677bbf6858586f7f17c",
    //     "timestamp": "2018-03-04T06:02:18.283Z"
    // }
    let params = filter  ? encodeURIComponent(JSON.stringify(filter)) : ""; 
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Transfer/" + (txId ? txId : "");
    url = url + (params ? "?filter="+params : "");
    let request = axios.get("http://"+url);

    request.then((response) => {
        callback(null, response)
    })
    .catch((err) => {
        console.log(err.response);
        callback(err, null);
    });
}

const getTransactionsFromCouch = (filter, callback) => {
    let url = process.env.COMPOSER_IP + ":" + process.env.COUCH_PORT + "/composerchannel/_find";
    
    let request = axios.post("http://"+url, filter);
    console.log("http://"+url);
    request.then((response) => {
        console.log(response.data);
        callback(null, {data:response.data.docs})
    })
    .catch((err) => {
        callback(err.response.data.error, null);
    });
}

const submitTransaction = (data, callback) => {
    // {
    //     "$class": "org.acme.transfer.Employee",
    //     "empId": "string",
    //     "firstName": "string",
    //     "lastName": "string",
    //     "email": "string",
    //     "department": "string"
    // }
    //let { assetId } = req.query;
    let url = process.env.COMPOSER_IP + ":" + process.env.COMPOSER_PORT + "/api/Transfer/";
    let request = axios.post("http://"+url, data);

    request.then((response) => {
        callback(null, response)
    })
    .catch((err) => {
        callback(err, null);
    });
}

module.exports = {
    getComodity,
    addComodity,
    checkEmployee,
    deleteComodity,
    getEmployee,
    addEmployee,
    deleteEmployee,
    getTransactions,
    getTransactionsFromCouch,
    submitTransaction
}