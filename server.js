// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express') );
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var AdventureSeaker = require('./models/adventureSeaker');
//var mongoose = require('mongoose');


var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jpms:qwer123@ds159998.mlab.com:59998/heroku_n3fc1tr2', function(err) {
  if(err){
    console.log(err)
  }else {
    console.log("Connected to the database")
  }
});


var userRegister = {};
var userRegisterArray = [];

var contact ={};
var contactMap = [];

var ticket = {};
var ticketMap = []

var fs = require('fs');

var txtUsers = 'C:/nodeprojects/adventureTicketApp/users.txt';
var txtTickets = 'C:/nodeprojects/adventureTicketApp/tickets.txt';


app.set('port', (process.env.PORT || 5000));
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



//########### addUserRegister() ###########

app.post('/adduserregister', function (req, res) {
  console.log(req.body);
  console.log("post request for adduserregister");
  userRegister = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email};

  //save on mongojs
  var adventureSeaker = new AdventureSeakers({
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  adventureSeaker.save(function (err){
    if(err){
      console.log("ERRO:                 " + err);
    }else {
      console.log('New adventureSeaker added on mongoDB: ' + adventureSeaker.firstName + ' ' + adventureSeaker.lastName + ' ' + adventureSeaker.email)
    }

  });
  //save on file
  fs.appendFile(txtUsers, userRegister.firstName +'\t\t\t\t\t'+ userRegister.lastName +'\t\t\t\t\t'+ userRegister.email + '\r\n', encoding = 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('User saved on File');
});



  userRegisterArray.push(userRegister);
  console.log(userRegister);



  res.send(true);

});

//########### addContact() ###########

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  ticket = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email};

  fs.appendFile(txtTickets, ticket.firstName +'\t\t\t\t\t'+ ticket.lastName +'\t\t\t\t\t'+ ticket.email + '\r\n', encoding = 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('Contact saved on file');
});

  ticketMap.push(ticket);
  console.log(ticketMap);
  res.send(true);

});



app.delete('/contactlist/:email', function (req, res) {
  var email = req.params.email;
  console.log(email);

  function findContact(contact) {
    return contact.email === email;
  }

  contactMap.splice(contactMap.indexOf(contactMap.find(findContact)));

});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
/*   db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  }); */
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);

});



// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});
