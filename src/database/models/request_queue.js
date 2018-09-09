const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {submitTransactionToLedger} = require('../../server_controllers/mongo-composer');

const RequestSchema = new Schema({
  requestId: String,
  assetId: String,
  owner: String,
  reqEmp: String,
  fromDate: Number,
  endDate: Number,
  requestDate: Number,
  cancelDate: Number,
  approvedDate: Number,
  approved: Boolean,
  received: Boolean,
  isClosed: Boolean,
  receivedTxId: String,
  submittedTxId: String,
  receivedDate: Number,
  submittedDate: Number,
  cancel: String
});


RequestSchema.pre('save',  function(next){
  const reqObj = {
    assetId:this.assetId,
    reqEmp:this.reqEmp,
    owner:this.owner,
    isClosed:this.isClosed,
    cancel:""
  }
  console.log(reqObj);
	//check only when we are inserting request
  Requests.findOne(reqObj).then((r)=>{
		if(r)
			next(new Error('request for asset already exist and not closed'));
		else
			next();
	});
});

RequestSchema.pre('update',  function(next){
  if(this._update.$set && this._update.$set.approved) {
    Requests.findOne({"assetId":this._conditions["assetId"], "approved":true, $and:[{"isClosed": false}, {"cancel":""}]})
    .then(function(a){
      if(a)
        next(new Error('cannot approve when there is active request already without cancel or close'));
      else
        next();
    });
  }
  else if(this._update.$set && (this._update.$set.received || this._update.$set.isClosed)) {
    let assetId = this._conditions.assetId;
    let temp_owner =  this._update.$set.received ? this._conditions.reqEmp : this._conditions.owner;

    submitTransactionToLedger(assetId, temp_owner)
    .then((data) => {
      if(this._update.$set.received) {
        this._update.$set.receivedTxId = data.transactionId;
        this._update.$set.receivedDate = new Date().getTime();
      }
      else {
        this._update.$set.submittedTxId = data.transactionId;
        this._update.$set.submittedDate = new Date().getTime();
      }
      next();
    }).catch((err) => {
      next(new Error("errror"));
    });
  }
  else
    next();
});

const Requests = mongoose.model('requests', RequestSchema);

module.exports = Requests;
