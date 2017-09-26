//User Model for storing our users information.

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create User schema
var UserSchema = new Schema({
  // name is a required string
	name: {
		type: String,
		required: true,
		unique: true,
	},
  // link is a required string
  email: {
    type: String,
    required: true
  },
  // Firebase uid
  firebaseUid: {
    type: String,
    required: true
  },
  // List of Games - populated from GameList
  gamelist: [{
    type: Schema.Types.ObjectId,
    ref: "Games"
  }]

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
