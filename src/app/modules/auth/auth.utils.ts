import jwt from 'jsonwebtoken';
import config from '../../config';

export const generateAccessToken = (jwtPayload: {
  email: string;
  password: string;
  role?:string
}) => {
  return jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: config.access_token_expire,
  });
};

export const generaterefreshToken = (jwtPayload: {
  email: string;
  password: string;
}) => {
  return jwt.sign(jwtPayload, config.refresh_token_secret as string, {
    expiresIn: config.refresh_token_expire,
  });
};

export const verifyToken = (jwtToken:string)=>{
    return jwt.verify(jwtToken, config.access_token_secret as string);
}