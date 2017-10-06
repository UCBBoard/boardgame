const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
   type: String,
   required: true,
   unique: true
  },

  author: {
    type: String,
  },

  minPlayers: {
    type: Number
  },

  maxPlayers: {
    type: Number
  },

  genre: {
    type: String,
  },

  playtime: {
    type: String
  },

  users: [{
    type: Schema.Types.String,
    ref: "User",
    required: true
  }]
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
