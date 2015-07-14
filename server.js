// require express framework and additional modules
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	_ = require('underscore');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/action');

var Action = require('./models/actionModel');


// pre-seeded action data
// var actions = [
// 	{id: 1, name: "Race", description: "We must tackle the issues of racism"},
// 	{id: 2, name: "Employment and diversity", description: "Let's increase jobs and diversity in the tech industry"},
// 	{id: 3, name: "Empower", description: "We must start empowering our youth with positivity"}

// ];


// Routes
// root route (serves index.html)
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

// should receive all action
app.get('/api/actions', function(req,res){
	// find all action in db
	Action.find(function (err, actions){
		res.json(actions);
	});
});


// create a new blog post
app.post('/api/actions', function (req, res){
	// grab params from form data
	var newAction = new Action({
		name: req.body.name,
		description: req.body.description
	});

	// save new action in db
	newAction.save(function (err, savedAction){
		res.json(savedAction);
	});
});

// should get an id
app.get('/api/actions/:id', function(req, res){

	// take the value of the id from the url parameter
	var actionId = req.params.id;

	// find items in `action` array matching the id
	Action.findOne({_id: actionId}, function (err, foundAction){
		res.json(foundAction);
	});
});

app.put('/api/actions/:id', function(req, res){
	var actionId = req.params.id; // /api/actions/:id(req.params.id)
console.log("actionId", actionId)
	// find action in db by id

	console.log("actionIdDDDD", Action.findOne({_id: actionId}));

	Action.findOne({_id: actionId}, function (err, foundAction){
		// update the action's name and description
		console.log("foundAction", foundAction);
		foundAction.name = req.body.name;
		foundAction.description = req.body.description;

		// save updated action in db 
		foundAction.save(function (err, savedAction){
			res.json(savedAction);
		});
	});
});

app.delete('/api/actions/:id', function(req, res){
	// set the value of the id
	var actionId = req.params.id;
	
	// find action in db by id and remove
	Action.findOneAndRemove({_id: actionId}, function (err, deletedAction){
		res.json(deletedAction);
	});
});

// listen on port 3000
app.listen(3000, function (){
	console.log('server started on localhost:3000');
});