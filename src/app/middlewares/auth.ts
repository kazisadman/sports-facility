import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import handleAsync from '../utils/handleAsync';

const verifyJWT = (userRole: string) => {
  return handleAsync(
    async (req: Request, res: Response, next: NextFunction) => {

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(403).json({
          success: false,
          statusCode: 403,
          message: 'Access denied',
        });
      }

      const token = authHeader?.split(' ')[1]


      const decodedToken = jwt.verify(
        token as string,
        config.access_token_secret as string,
      );

      type jwtPayload = {
        email: string;
        role: string;
      };

      const { email, role } = decodedToken as jwtPayload;

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
