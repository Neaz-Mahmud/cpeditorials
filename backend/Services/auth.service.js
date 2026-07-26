import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { TOKEN_TYPE } from "../utils/constant.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const gnerateToken = (userid, tokentype) => {

  const secret = tokentype === TOKEN_TYPE.ACCESS_TOKEN ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  const expiarydate = (tokentype === TOKEN_TYPE.ACCESS_TOKEN) ? process.env.JWT_ACCESS_EXPIRY : process.env.JWT_REFRESH_EXPIRY;

  return jwt.sign({ userid }, secret, { expiresIn: expiarydate })

};



export const generateTokenpair = async (user) => {

  const accessToken = generateToken(user.__id, TOKEN_TYPE.ACCESS_TOKEN);
  const refreshToken = generateToken(user.__id, TOKEN_TYPE.REFRESH_TOKEN);


    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false});

  return {accessToken,refreshToken};


};

export const registerUser = async (data) => {
  const { username, email, password, handle, bio } = data;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    const foundField = existingUser.email === email ? "email" : "username";
    throw new Apierror(400, `${foundField} already found`);
  }

  const user = await User.create({ username, email, password, handle, bio });

  return { user, accessToken,refreshToken } = await generateTokenpair(user);
};
