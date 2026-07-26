
import * as autser from '../Services/auth.service.js'
import dotenv from 'dotenv'

dotenv.config();

const DURATION_UNITS_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};


const refreshTokenMaxAgeMs = () => {
  const expiry = String(env.JWT_REFRESH_EXPIRY).trim();

  // Bare number → seconds, per the jsonwebtoken contract.
  if (/^\d+$/.test(expiry)) {
    return Number(expiry) * 1000;
  }

  const match = /^(\d+)([smhd])$/.exec(expiry);
  if (!match) {
    throw new Error(
      `Unsupported JWT_REFRESH_EXPIRY format: "${expiry}". Use a number of ` +
      'seconds, or a value like 30m, 12h, 7d.'
    );
  }

  return Number(match[1]) * DURATION_UNITS_MS[match[2]];
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  path: '/'

}

const setRefreshTokenCookie = (res, refreshToken) => {

  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: refreshTokenMaxAgeMs(),
  })

}

export const register = async (req, res, next) => {



  const { user, refreshToken, accessToken } = await autser.registerUser(req.body);

  setRefreshTokenCookie(res, refreshToken);





};
