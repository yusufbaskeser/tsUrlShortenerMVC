import { registerTest } from "./auth.utils";
import request from 'supertest'
import index from '../index'
const { app } = index;
export const shortUrl = async ()=>{


const { token } = await registerTest({username :"yusuf", password : "yusuf123"});


    const res = await request(app)
    .post("/url/shorten")
    .set("Authorization", token)
    .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });

let url :string;
    url = res.body.result.shortUrl;


return url ;
  
  
}
