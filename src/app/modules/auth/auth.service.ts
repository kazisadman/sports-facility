import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { generateAccessToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const matchedUser = await User.findOne({ email });

  const isValidPassword = await User.isPasswordCorrect(
    password,
    matchedUser?.password,
  );

  const jwtPayload = {
    email: email,
    password: password,
    role: matchedUser?.role,
  };

  if (isValidPassword) {
    const accessToken = generateAccessToken(jwtPayload);

    const user = await User.findById(matchedUser?._id).select(
      '-password -createdAt -updatedAt -__v',
    );
    return { accessToken, user };
  }
};

export const authService = { loginUser };
