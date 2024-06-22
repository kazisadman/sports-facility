import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { userSingUpInDb } from './user.service';
import { ApiResponse } from '../../utils/sendResponse';
import { User } from './user.model';

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const validatedData = userValidationSchema.parse(userData);

  const user = await userSingUpInDb(validatedData);

  const result = await User.findById(user?._id).select(
    '-password -createdAt -updatedAt -__v',
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, 'User registered successfully'));
};

export { createUser };
