import {getUserUrls, listAllUrls} from '../services/user'
import { Request , Response } from "express"


export const getMyUrls = async (req :Request, res : Response) => {

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

  try {

    

    const userId = req.user.id;


console.log("wqeqweqweqweqweqw" , userId);  
console.log("wqeqweqweqweqweqw" , userId);  


    const urls = await getUserUrls(String(userId));
    res.status(200).json({ myurls: urls });
  } catch (err : any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const listUrls = async (req : Request, res : Response) => {
  try {
    const urls = await listAllUrls();
    res.status(200).json(urls);
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};
