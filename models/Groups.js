// Group Model for storing group information.

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Group Schema
var GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  creator: {
    type: String,
    required: true
  },

  mods: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  location: {
    type: String
  },

  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],

  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],

  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

})

// Create the Group model with the GroupSchema
var Group = mongoose.model("Group", GroupSchema);

// Export the model
module.exports = Group;
