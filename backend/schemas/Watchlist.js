const { Schema } = require("mongoose");

const WatchlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  isDown: {
    type: Boolean,
    default: false,
  },

  percent: {
    type: String,
    default: "0.00%",
  }, 
});

module.exports = { WatchlistSchema };