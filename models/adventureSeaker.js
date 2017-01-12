var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adventureSeakerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('AdventureSeakers', adventureSeakerSchema);
