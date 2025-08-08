import dotenv, { config } from 'dotenv'

dotenv.config();


export default {
  PORT: process.env.PORT || 3000,
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  MONGODUMMY_CONNECT: process.env.MONGODUMMY_CONNECT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

