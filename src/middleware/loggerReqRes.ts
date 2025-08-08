import { Request, Response, NextFunction } from "express";
import pino from 'pino';

const logger = pino();

export const loggerReqRes = (req:Request, res:Response, next:NextFunction) => {
    const originalSend = res.send;
    
  
    res.send = function (body) {
      logger.info(
        JSON.stringify({
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          response: body,
          headers: req.headers,
        }),
      );
  
      return originalSend.call(this, body);
    };
  
    next();
  };
  

