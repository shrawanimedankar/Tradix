const { sendResponse } = require("../utils/sendResponse");

const signup = async (req, res) => {
  try{
    const{fullName, email, password} = req.body;

    const existingUser = await UserModel.findOne({email});

    if(existingUser){
      return sendResponse(res, {
        success:false,
        status_code:400,
        message:"Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);


  }
};
const login = async (req, res) => {};

module.exports = {
  signup,
  login,
};
