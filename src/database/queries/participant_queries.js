const Participant = require('../models/participant');
const Requests = require('../models/request_queue');
//const mongoose = require('mongoose');
const cache = require('memory-cache');
const shortid = require('shortid');
//let assetRegistry = require('../models/assetfile.json');

const addParticipant = function(participant){
	const user = new Participant(participant);
  	return user.save();
}

const searchParticipant = function(filter={}){
	return Participant
	.find(filter, {_id:0, __v:0})
	.catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const deleteParticipant = function(filter={}){
	return Requests.findOne({
		$and:[
			{$or:[{reqEmp:filter["empId"]},{owner:filter["empId"]}]},
			{$or:[
				{$and:[{isClosed: false, approved:true}]},{$and:[{isClosed: false, approved:true}]}
			]}
		]
	}).then((r)=>{
		if(r)
			return new Promise(function(resolve, reject){
				reject({message:
					'Participant involved in requests which are active, please close or cancel those requests'
				});
			});
		else
			return Participant.remove(filter);
	})
	.catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const removeParticipant = function(empId){
	return Participant.remove({
		empId:empId
	});
}

const requestAsset = function(assetObj){
	// TODO: add validation for asset check
	if(!cache.get(assetObj.assetId))
		throw new Error('asset not found');
		
	let reqObj = Object.assign({},
		assetObj,
		{
			requestId: shortid.generate(),
			owner:cache.get(assetObj.assetId),
			reqEmp: assetObj.reqEmp,
			fromDate: new Date(new Date(assetObj.fromDate).toDateString()).getTime(),
			endDate: new Date(new Date(assetObj.endDate).toDateString()).getTime(),
			requestDate: new Date(new Date().toDateString()).getTime(),
			approved: false,
			received: false,
			isClosed: false,
			cancel: ""
		}
	);
	const request = new Requests(reqObj);
  	return request.save();
}
//bug: approve request comes from owner not requester
const approveRequest = function(reqObj){
	return Requests.update(
		{"owner":cache.get(reqObj.assetId),"requestId":reqObj.requestId,"assetId":reqObj.assetId,"reqEmp":reqObj.reqEmp,"approved":false,"isClosed":false},
		{$set:{"approved":true, "approvedDate":new Date(new Date().toDateString()).getTime()}}
	).catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const receiveAsset = function(reqObj){
	return Requests.update(
		{"reqEmp":reqObj.reqEmp,"assetId":reqObj.assetId,"requestId":reqObj.requestId,"owner":cache.get(reqObj.assetId), "approved":true,"isClosed":false},
		{$set:{"received":true}}
	)
	.catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const closeRequest = function(reqObj){
	return Requests.update(
		{"reqEmp":reqObj.reqEmp,"requestId":reqObj.requestId,"assetId":reqObj.assetId,"owner":cache.get(reqObj.assetId),"received":true,"isClosed":false},
		{$set:{"isClosed":true}} //"received":true, "approved":true,
	)
	.catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});
}

const cancelRequest = function(reqObj){
	console.log({"reqEmp":reqObj.reqEmp,"requestId":reqObj.requestId,"assetId":reqObj.assetId});
	return Requests.update(
		{"reqEmp":reqObj.reqEmp,"requestId":reqObj.requestId,"assetId":reqObj.assetId},
		{$set:{"cancel":reqObj.cancel, "cancelDate":new Date(new Date().toDateString()).getTime()}}
	)
	.catch(function(err){
		return new Promise(function(resolve, reject){
			reject(err);
		});
	});	
}

module.exports = {
	addParticipant,
	searchParticipant,
	removeParticipant,
	deleteParticipant,
	requestAsset,
	approveRequest,
	receiveAsset,
	closeRequest,
	cancelRequest
};
