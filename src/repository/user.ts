import User from '../models/user'
import bcrypt from 'bcrypt'
import config from '../config/config'
import jwt from 'jsonwebtoken';
import { user } from '../types/User'


export const getByToken = async (token : string) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY as string);
    console.log("Decoded token payload:", decoded);
    
    if (typeof decoded === 'string') {
        throw new Error("Decoded token is a string, expected JwtPayload");
      }

    const user = await User.findById(decoded.id);
    return user;
  } catch (err : any) {
    console.log("Token verify error:", err.message);
    return null;
  }
};


export const getByUsername = async (username : string) => {

  return await User.findOne({ username });

}


export const addUser = async ({username, password} : user) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hash,
  });

  await newUser.save();
  return newUser;
};

