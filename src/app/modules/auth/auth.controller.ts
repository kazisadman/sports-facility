import { Request, Response } from 'express';
import { authService } from './auth.service';
import { ApiResponse } from '../../utils/sendResponse';

const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.cookie('accessToken', result?.accessToken, {
    secure: true,
    httpOnly: true,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result?.user,
        'User logged in successfully',
        result?.accessToken,
      ),
    );
};

export { loginUser };
