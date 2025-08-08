import {generateToken} from '../utils/generateToken'
import {findShortUrl, createUrl} from '../repository/url'
import {getByToken} from '../repository/user'
import User from '../models/user'
import { UrlInput, url } from '../types/User';


export const urlShorten = async ({ token, originalUrl }: UrlInput) => {
 

  if (!originalUrl) {
    throw new Error("Original URL are required");
  }

  if (!token) {
    throw new Error("Token is required");
  }

  const User = await getByToken(token);
  if (!User) {
    throw new Error("Invalid token");
  }

  const shortUrl = generateToken(6);
  await createUrl({ shortUrl, originalUrl, user: User });

  return {
    shortUrl: `http://localhost:${process.env.PORT}/url/${shortUrl}`,
  };
};

export const urlRedirect = async (shortUrl: string) => {
    const url = await findShortUrl(shortUrl);
  
    if (!url) {
      throw new Error("Short URL not found");
    }
  
    return url.originalUrl;
  };
  