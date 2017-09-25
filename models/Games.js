const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Games = new Schema({
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

const Games = mongoose.model("Game", GamesSchema);

module.exports = GameList;
