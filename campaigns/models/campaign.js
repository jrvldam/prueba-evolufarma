const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
	"_id": { type: String , unique: true },
  "name": { type: String , unique: true, lowercase: true },
	"title" : String,
	"subject" : String,
	"recipents" : [String],
	"schedule" : Number,
	"html" : String
});

const ModelClass = mongoose.model('campaign', campaignSchema);

module.exports = ModelClass;
