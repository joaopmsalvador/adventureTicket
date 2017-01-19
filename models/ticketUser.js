var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketUserSchema = new Schema({
    firstNameTicket: {type: String, required: true},
    lastNameTicket: {type: String, required: true},
    emailTicket: {type: String, required: true},
    subscrition:{type: Boolean, required:true, default: true},
    timestamp: {type: Date, default: Date.now},
    ticketImage:{type: Buffer, contentType: String}
});

module.exports = mongoose.model('TicketUser', ticketUserSchema);
