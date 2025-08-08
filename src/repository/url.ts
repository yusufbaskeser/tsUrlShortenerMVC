import Url from '../models/url'
import {url} from '../types/User'

export const findShortUrl = async (shortUrl : string) => {
  return await Url.findOne({ shortUrl });
};

export const findAllUrls = async () => {
  return await Url.find();
};

export const createUrl = async ({shortUrl, originalUrl, user} : url) => {
  const newUrl = new Url({
    shortUrl,
    originalUrl,
    createdBy: user.username,
  });
  await newUrl.save();
  return newUrl;
};

export const getUrlsByUsername = async (username : string) => {
  return Url.find({ createdBy: username });
};

