const mongoose = require('mongoose');

const reqModel = new mongoose.Schema({
    message: {type: String}
}, {versionKey: false});
const ReqModel = mongoose.model('ReqModel', reqModel);
module.exports = ReqModel;