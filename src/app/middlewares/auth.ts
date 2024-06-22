import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers?.cookie?.split('=')[1];

  const decodedToken = jwt.verify(
    token as string,
    config.access_token_secret as string,
  );

 const email = decodedToken?.email;

  const user = await User.findOne({email}).select('-password');
  

  req.user = user;

  next();
};

export default verifyJWT;
