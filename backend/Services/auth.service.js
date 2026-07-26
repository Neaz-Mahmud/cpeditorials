import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { TOKEN_TYPE } from "../utils/constant.js";
const gnerateToken = () => {};

export const generateTokenpair = (user) => {
  const accessToken = generateToken(user.__id, TOKEN_TYPE.ACCESS_TOKEN);
  const refreshToken = generateToken(user.__id, TOKEN_TYPE.REFRESH_TOKEN);
};

export const registerUser = async (data) => {
  const { username, email, password, handle, bio } = data;

  const existingUser = await User.findone({ $or: [{ email }, { username }] });
  if (existingUser) {
    const foundField = existingUser.email === email ? "email" : "username";
    return next(new Apierror(400, `${foundField} already found`));
  }

  const user = await User.create({ username, email, password, handle, bio });

  const { refreshToken, accessToken } = generateTokenpair(user);
};
