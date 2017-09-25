const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
