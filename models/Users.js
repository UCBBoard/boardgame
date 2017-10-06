//User Model for storing our users information.

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create User schema
var UserSchema = new Schema({
  _id: {
    type: String
  },

  name: {
    type: String
  },

  email: {
    type: String,
  },

  exp: {
    type: Number,
    default: 1
  },

  level: {
    type: Number,
    default: 1
  },

  toNextLevel: {
    type: Number,
    default: 100
  },

  cardNum: {
    type: Number,
    default: 0
  },
  // List of Games - populated from GameList
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game",
  }],

  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: "Game",
  }],

  // List of friends IDS
  friends: [{
    type: String,
    ref: "User"
  }],

  notifications: [{
    type: String,
    ref: "User"
    },
  ]

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
