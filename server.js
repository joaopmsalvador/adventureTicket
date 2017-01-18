// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var AdventureSeaker = require('./models/adventureSeaker');
var TicketUser = require('./models/ticketUser');
var universalAnalytics = require('universal-analytics');
//var mongoose = require('mongoose');

var visitor = universalAnalytics('UA-90577424-1',{https: true});



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
var ticket = {};


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



//########### addUserRegister() ###########

app.post('/addAdventureSeaker', function (req, res) {
  console.log('################' + req + '##############33')
  console.log(req.body);
  console.log("post request for adduserregister");

  //save on mongojs
  var adventureSeaker = new AdventureSeaker({
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  adventureSeaker.save(function (err){
    if(err){
      console.log("ERRO:           " + err);
      res.send(err);
    }else {
      console.log('New adventureSeaker added on mongoDB: ' + adventureSeaker.firstName + ' ' + adventureSeaker.lastName + ' ' + adventureSeaker.email)
      res.send(true);
    }
  });
});

//########### addTicketUser() ###########

app.post('/addTicketUser', function (req, res) {
  console.log(req.body);

  //save on mongoDB
  var ticketUser = new TicketUser({
    firstNameTicket: req.body.firstNameTicket,
    lastNameTicket: req.body.lastNameTicket,
    emailTicket: req.body.emailTicket
  });

  ticketUser.save(function (err){
    if(err){
      console.log("ERRO:           " + err);
      res.send(err);
    }else {
      console.log('New ticketUser added on mongoDB: ' + ticketUser.firstNameTicket + ' ' + ticketUser.lastNameTicket + ' ' + ticketUser.emailTicket)
      res.send(true);
    }
  });

  visitor.pageview("/", "https://aqueous-brushlands-18928.herokuapp.com/addTicketUser", "Add TicketUser", function (err) {
    console.log(err);
  });
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
