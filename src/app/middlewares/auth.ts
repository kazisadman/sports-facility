import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import handleAsync from '../utils/handleAsync';

const verifyJWT = (userRole: string) => {
  return handleAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers?.cookie?.split('=')[1];

      const decodedToken = jwt.verify(
        token as string,
        config.access_token_secret as string,
      );

      const { email, role } = decodedToken;

      const user = await User.findOne({ email }).select('-password');

      if (userRole !== role) {
        res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'You have no access to this route',
        });
      }

      req.user = user;

      next();
    },
  );
};

export default verifyJWT;
