const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameList = new Schema({
  title: {
   type: String,
   required: true
  },
  author: {
    type: String,
  },
  players: {
    type: String,
  },
  genre: {
    type: String,
  },
  playtime: {
    type: String
  }
});

const GameList = mongoose.model("GameList", GameListSchema);

module.exports = GameList;
