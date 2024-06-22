import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: 'admin' | 'user';
  address: string;
}

export interface UserModel extends Model<TUser> {
  isPasswordCorrect(
    plainTextPassword: string,
    hashedPassword?: string,
  ): Promise<boolean>;
}
