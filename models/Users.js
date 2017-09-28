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
  // name is a required string
	name: {
		type: String,
		// required: true,
		// unique: true,
	},
  // link is a required string
  email: {
    type: String,
    // required: true
  },
  // List of Games - populated from GameList
  mygameslist: [{
    type: Schema.Types.String,
    ref: "Games"
  }],
  // List of friends IDS
  friends: [{
    type: String,
    ref: "User"
  }]

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
