const { model } = require("mongoose");
const { UserSchema } = require("../schemas/User");

const UserModel = new model("user", UserSchema);

module.exports = { UserModel };
