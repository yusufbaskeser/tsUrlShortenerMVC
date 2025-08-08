import{getUrlsByUsername, findAllUrls } from '../repository/url'
import User from '../models/user'


export const getUserUrls = async (userId : string) => {
  try {
    const user = await User.findById(userId);
    console.log("wqeqweqweqweqweqw");
    
    
    if (!user) {
      throw new Error("Invalid user");
    }

    const urls = await getUrlsByUsername(user.username);
    return urls;
  } catch (err : any) {
    throw new Error("Server Error: " + err.message);
  }
};

export const listAllUrls = async () => {
  try {
    const urls = await findAllUrls();
    return urls;
  } catch (err: any) {
    throw new Error("Server Error: " + (err?.message || err));
  }
};
