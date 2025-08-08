import { Request , Response } from "express"
import {userRegister , userLogin} from '../services/auth'

export const registerUser  = async (req : Request,res : Response)=>{
const {username , password} = req.body;

try { 
    const result = await userRegister({ username, password });
    res.status(201).json(result);
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};


export const loginUser = async (req : Request, res : Response) => {

  const { username, password } = req.body;
  console.log("Login request:", { username, password }); 
  try {
    const result = await userLogin({ username, password });
    console.log("Login success:", result); 

    res.status(200).json(result);
  } catch (err : any) {
    console.log("Login error:", err.message || err.toString()); 
    res.status(400).json({ error: err.message || err.toString() });
  }
};
