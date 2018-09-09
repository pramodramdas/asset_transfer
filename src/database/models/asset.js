const mongoose = require('mongoose');
const Participant = require('./participant');
const Schema = mongoose.Schema;
const {addAssetToLedger} = require('../../server_controllers/mongo-composer');

const AssetSchema = new Schema({
  assetId: String,
  owner: String,
  description: String
});

AssetSchema.pre('save', function(next){
	let that = this;
	assetRegistry.findOne({assetId:this["assetId"]})
	.then(function(a){
		if(a)
			next(new Error('Asset already exist'));
		else {
			Participant.findOne({empId: that["owner"]})
			.then((p)=>{
				if(!p)
					next(new Error('Participant does not exist'));
				else
					addAssetToLedger(that);
			}).then((data) => {
				next();
			}).catch((err) => {
				next(new Error("error"));
			});
		}
	});
});

// AssetSchema.post('save', function(doc, next){
//     addAssetToLedger(doc).then((data) => {
// 		next();
// 	})
// 	.catch((err) => {
// 		setTimeout(()=>{
// 			assetRegistry.remove({assetId:doc.assetId}, (error, res)=>{
// 				console.log(error);
// 				console.log(res);
// 			});
// 		}, 3000);
// 		next(new Error("error"));
// 	});
// });

AssetSchema.index({description: 'text'});

const assetRegistry = mongoose.model('assets', AssetSchema);

module.exports = assetRegistry;