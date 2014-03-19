var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: String,
	owner: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});