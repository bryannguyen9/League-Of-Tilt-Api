// Define Mongoose
const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Create a new instance of the Mongoose schema to define the shape of each document
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

// Using mongoose.model() to compile a model based on the schema
// 'Reaction' is the name of the model
// reactionSchema is the name of the schema we are using to create a new instance of the model
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;