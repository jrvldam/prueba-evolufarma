const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrySchema = new Schema({
  "total_recipents": Number,
	"schedule" : Number,
});

const ModelClass = mongoose.model('registry', registrySchema);

module.exports = ModelClass;
