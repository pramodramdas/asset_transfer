import axios from "axios";

export const getDataByDateCat = (fromDate, toDate, callback) => {
    const req = axios.post("/getTimeSeriesData", {fromDate, toDate});
    req.then(resp => {
        callback(resp.data);
    }).catch((e) => {
        callback([]);
    });
}

export const getTotalRequestsByCat = (callback) => {
    const req = axios.get("/getTotalRequestsByCat");
    req.then(resp => {
        callback(resp.data);
    }).catch((e) => {
        callback([]);
    });
}

export const getDepts = (callback) => {
    const req = axios.get("/getDepts");
    req.then(resp => {
        callback(resp.data);
    }).catch((e) => {
        callback([]);
    });
}

export const getAssetsByDept = (callback) => {
    const req = axios.get("/getAssetsByDept");
    req.then(resp => {
        console.log('dad');
        callback(resp.data);
    }).catch((e) => {
        console.log(e);
        callback([]);
    });
}