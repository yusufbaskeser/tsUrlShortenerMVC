import UrlModel from '../models/url'
import {Url} from '../types/User'

export const findShortUrl = async (shortUrl : string) => {
  return await UrlModel.findOne({ shortUrl });
};

export const findAllUrls = async () => {
  return await UrlModel.find();
};

export const createUrl = async ({shortUrl, originalUrl, user} : Url) => {
  const newUrl = new UrlModel({
    shortUrl,
    originalUrl,
    createdBy: user.username,
  });
  await newUrl.save();
  return newUrl;
};

export const getUrlsByUsername = async (username : string) => {
  return UrlModel.find({ createdBy: username });
};

