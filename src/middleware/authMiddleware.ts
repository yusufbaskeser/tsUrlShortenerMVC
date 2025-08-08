import jwt from 'jsonwebtoken'
import { Request , Response , NextFunction} from "express"
import config from '../config/config'
import { user } from '../types/User';


export const authMiddleware = (req: Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY as string);
    req.user = decoded as user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

