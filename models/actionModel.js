var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ActionSchema = new Schema({
	name: String,
	description: String
});

var Action = mongoose.model('Action', ActionSchema);

module.exports = Action;