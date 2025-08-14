import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';

import { loggerReqRes } from './middleware/loggerReqRes';
import {logg} from './utils/logger'
const app = express();
import path from 'path';

app.use(express.static(path.join(__dirname, 'public')));



app.use(express.static(path.join(__dirname, "views")));




app.use(express.json());


import authRouter from './router/auth';
import userRouter from './router/user';
import urlRouter from './router/url';


import { redirectUrl } from './controller/url';

app.use(loggerReqRes);

app.use("/auth" , authRouter);
app.use("/user" , userRouter);
app.use("/url" , urlRouter);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  });
  
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  });
  
  app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
  });
  
 
  
  app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "allUrls.html"));
  });
  
  app.get("/myurls", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "myurls.html"));
  });
  
  app.get("/shorten/adv", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "adv.html"));
  });

app.get("/:shortUrl", redirectUrl);



const server =app.listen(config.PORT ,() => {
    mongoose.connect(String(config.MONGO_CONNECT))  
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
    mongoose.connection.on("error", (err) => {
        logg(err);
      });

    console.log(`Server working on PORT :${config.PORT}`);
})

export default{
    app,
    mongoose,
    server
}