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
  // List of Games - may populate from another model
  gamelist: [
    type: Schema.Types.ObjectId,
    ref: "GameList"
  ]

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = UserDB;
