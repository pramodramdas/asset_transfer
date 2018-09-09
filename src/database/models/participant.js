const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Requests = require('./request_queue');
const {addParticipantToLedger} = require('../../server_controllers/mongo-composer');
// const SentSchema = require('./sent_queue');
//let assetRegistry = require('./assetfile.json');

const ParticipantSchema = new Schema({
	empId: {
		type: String,
		required: [true, 'Employee Id is required.']
	},
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.']
	},
	email: {
		type: String,
		validate: {
			validator: (email) => {
				const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				return reg.test(email);
			},
			message: 'Invalid email address'
		},
		required: [true, 'Email is required.']
	},
	role: {
		type: String,
		required: [true, 'Role is required.']
	},
	department: {
		type: String,
		required: [true, 'department is required.']
	}
	// request_queue: [RequestSchema],
	// sent_queue: [SentSchema]
});

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })  
}

ParticipantSchema.pre('save', function(next){
	let that = this;
	Participant.findOne({$or:[{empId:this["empId"]},{"email":this["email"]}]})
	.then(function(p){
		if(p)
			next(new Error('participant already exist'));
		else {
			return addParticipantToLedger(that);
		}
	}).then((data) => {
		next();
   	}).catch((err) => {
		next(new Error("error"));
   	});
});

// ParticipantSchema.post('save', function(doc, next){
// 	addParticipantToLedger(doc).then((data) => {
// 		next();
// 	})
// 	.catch((err) => {
// 		setTimeout(()=>{
// 			Participant.remove({empId:doc.empId}, (error, res)=>{
// 				console.log(error);
// 				//console.log(res);
// 			});
// 		}, 3000);
// 		next(new Error("error"));
// 	});
// });

// ParticipantSchema.pre('remove', function(next){
// 	console.log(this);
// 	Requests.findOne(
// 		{
// 			$and:[
// 				{$or:[{reqEmp:this["empId"]},{owner:this["empId"]}]},
// 				{$or:[
// 					{$and:[{isClosed: false, approved:true}]},{$and:[{isClosed: false, approved:true}]}
// 				]}
// 			]
// 		}
// 	)
// 	.then(function(p){
// 		if(p)
// 			next(new Error('Participant involved in requests which are active, please close or cancel those requests'));
// 		else
// 			next();
// 	});
// });

const Participant = mongoose.model('participant', ParticipantSchema);

module.exports = Participant;
