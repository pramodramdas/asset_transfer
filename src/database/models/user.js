const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    empId: String,
    name: String,
    password: String,
    email: String,
    role: String
});

const User = mongoose.model('user_infos', UserSchema);

module.exports = User;