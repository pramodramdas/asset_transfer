const cache = require('memory-cache');
const mongoose = require('mongoose');
const assetRegistry = require('../models/asset');

const addAsset = function(req, res){
    const { assetId, owner, description } = req.body;

    if(assetId && owner){
        const asset = new assetRegistry(
            { 
                assetId:assetId,
                owner:owner,
                description:description.toLowerCase()
            });
        asset.save()
        .then(function(data){
            if(data.assetId && asset.owner)
                cache.put(data.assetId, asset.owner);
            res.status(200).send({sucess:true, message: data});
        })
        .catch(function(err){
            console.log(err);
            res.status(200).send({sucess:false, error: err.message});
        }); 
    }
    else
        res.status(200).send({sucess:false, error: "error fields missing try again"});
}

const loadAllAssets = function(){
    assetRegistry.find({})
    .then(function(data){
        data.forEach((asset)=>{
            cache.put(asset.assetId, asset.owner);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

const searchAssetAdmin = function(filter={}){
    return assetRegistry.find(filter, {_id:0, __v:0})
    .catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const removeAssetAdmin = function(filter={}){
    return assetRegistry.remove(filter)
    .catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

module.exports = {
    addAsset,
    loadAllAssets,
    searchAssetAdmin,
    removeAssetAdmin
}