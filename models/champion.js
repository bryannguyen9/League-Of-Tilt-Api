// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define the shape of each document
const championSchema = new mongoose.Schema({
  // Add individual properties and their types
  championName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Setting required to true will disallow null values
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Champion'
    }
  ]
});

// create a virtual property called friendCount that retrieves the length of the champion's friends array field on query
championSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Using mongoose.model() to compile a model based on the schema
// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;
