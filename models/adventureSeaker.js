var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adventureSeakerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    subscrition:{type: Boolean, required:true, default: true},
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('AdventureSeaker', adventureSeakerSchema);
