// require express framework and additional modules
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
	_ = require('underscore');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));


// pre-seeded action data
var action = [
	{id: 1, name: "Race", description: "We must tackle the issues of racism"},
	{id: 2, name: "Employment and diversity", description: "Let's increase jobs and diversity in the tech industry"},
	{id: 3, name: "Empower", description: "We must start empowering our youth with positivity"}

];

// Routes
// root route (serves index.html)
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

// should receive all comments
app.get('api/action', function(req,res){
	res.json(action);
});

// create a new blog post
app.post('api/action', function (req, res){
	// grab params from form data
	var newAction = req.body;

	if(action.length > 0) {
		newAction.id = action[action.length - 1].id + 1;
	} else {
		newAction.id = 0;
	}
	
	// add newComments to `comments` array
	action.push(newAction);

	// send newComments as JSON response
	res.json(newAction);
});

app.put('api/action/:id', function(req, res){
	var actionId = parseInt(req.params.id);

	// set the value of the id
	var actionId = req.params.id;
	// find item in `comments` array matching the id
	var targetAction = _.findWhere(action, {id:actionId});
	// update the comment's name
	targetAction.name = req.body.name;
	// update the comment's description
	targetAction.description = req.body.description;
	// send back edited object
	res.json(targetAction);
});

app.delete('api/action/:id', function(req, res){
	// set the value of the id
	var deleteId = parseInt(req.params.id);
	// find item in `comments` array matching the id
	var deleteAction = _.findWhere(action, {id:deleteId});
	// get the index of the found item
	var index = action.indexOf(deleteAction);
	// remove the item at the index, remove one item
	action.splice(index, 1);
	// send back deleted object
	res.json(deleteAction);
});

// listen on port 3000
app.listen(3000, function (){
	console.log('server started on localhost:3000');
});