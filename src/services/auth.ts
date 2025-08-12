import bcrypt from 'bcrypt';
import generateJwtToken from '../utils/generateJwtToken';
import { getByUsername, addUser } from '../repository/user';
import { User } from '../types/User'

export const userRegister = async ({ username, password }: User) => {
  if (!username || !password) {
    throw new Error("Username and password required");
  }

  const existingUser = await getByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const newUser = await addUser({ username, password });

  const token = generateJwtToken({
    id: newUser._id.toString(),
    username: newUser.username,
  });

  return {
    message: "User registered successfully",
    token,
  };
};



export const userLogin = async ({ username, password } : User) => {
  if (!username || !password) {
    throw new Error("Username and password required");
  }

  const user = await getByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Incorrect password");
  }
  const token = generateJwtToken({ id: user._id.toString(), username: user.username });

  return {
    message: "Login successful",
    token: token,
  };
};