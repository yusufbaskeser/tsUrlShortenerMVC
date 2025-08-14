import jwt from 'jsonwebtoken'
import { Request , Response , NextFunction} from "express"
import config from '../config/config'
import { User } from '../types/User';


export const authMiddleware = (req: Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.redirect("/login");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY as string);
    req.user = decoded as User;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

