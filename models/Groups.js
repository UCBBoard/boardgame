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
    type: String,
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
    type: String,
    ref: "User",
    validate: {
      validator: function(v, cb) {
        User.find({name: v}, function(err,docs){
           cb(docs.length == 0);
        });
      },
      message: 'User already exists!'
    }
  }]

})

// Create the Group model with the GroupSchema
var Group = mongoose.model("Group", GroupSchema);

// Export the model
module.exports = Group;
