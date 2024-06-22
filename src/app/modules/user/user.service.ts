import { TUser } from './user.interface';
import { User } from './user.model';

const userSingUpInDb = async (payload: TUser) => {
  const newUser = await User.create(payload);
  return newUser;
};



export { userSingUpInDb };
