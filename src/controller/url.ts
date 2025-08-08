import { Request , Response } from "express"

import {urlShorten, urlRedirect } from '../services/url'

export const shortenUrl = async (req : Request, res : Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const { originalUrl } = req.body;

  try {
    const result = await urlShorten({ token, originalUrl });
    console.log(result);
    res.status(200).json({
      result,
      token
    });
  } catch (err : any) {
    res.status(400).json({ error: err.message || "Error" });
  }
};

export const redirectUrl = async (req : Request, res:Response) => {
  const { shortUrl } = req.params;
  if (!shortUrl || shortUrl.trim() === "") {
    return res.status(400).json({ error: "shortUrl is required" });
  }
  try {
    const originalUrl = await urlRedirect(shortUrl);
    return res.redirect(originalUrl);
  } catch (err) {
   

    return res.status(404).json({ error: "Short URL not found" });
  }
};

