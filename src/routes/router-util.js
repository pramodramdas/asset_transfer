const participantQuery = require('../database/queries/participant_queries');
const assetQuery = require('../database/queries/asset_queries');

const handlePromise = (func, parm, res) => {
    let query = participantQuery[func] || assetQuery[func];
    //participantQuery[func](parm)
    try {
        query(parm).then(function(data){
            res.status(200).send({sucess:true, message: data});
        })
        .catch(function(err){
            console.log(err);
            res.status(200).send({sucess:false, error: err.message});
        });
    }
    catch(err) {
        console.log(err);
        res.status(200).send({sucess:false, error: err.message});
    }
}

module.exports = {
    handlePromise:handlePromise
}