const { model } = require("mongoose");
const { WatchlistSchema } = require("../schemas/Watchlist");

const WatchlistModel = new model("watchlist", WatchlistSchema);

module.exports = { WatchlistModel };