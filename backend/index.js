if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const holdingsRoutes = require("./routes/holdings");
const positionsRoutes = require("./routes/positions");
const ordersRoutes = require("./routes/orders");
const fundsRoutes = require("./routes/funds");
const watchlistRoutes = require("./routes/watchlist");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/holdings", holdingsRoutes);
app.use("/positions", positionsRoutes);
app.use("/orders", ordersRoutes);
app.use("/funds", fundsRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = process.env.PORT || 8080;
const dbUrl = process.env.MONGODB_URL;

main()
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;