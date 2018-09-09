const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeptSchema = new Schema({
    depName: String,
    managerId: String 
});

const Dept = mongoose.model('departments', DeptSchema);

module.exports = Dept;