import { UserModel, IUser } from '../users/user.model';

export const createUser = async (user: Partial<IUser>) => {
  return UserModel.create(user);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email }).select('+passwordHash').exec();
};

export const findUserById = async (id: string) => {
  return UserModel.findById(id).exec();
};
