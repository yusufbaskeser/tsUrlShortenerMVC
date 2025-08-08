import index from '../index'
const { app, mongoose ,server} = index;
import request from 'supertest'
import config from '../config/config'
import User from '../models/user'
import Url from '../models/url'
import { registerTest } from './auth.utils';
import {shortUrl} from './url.utils'


let exampleShortUrl;
beforeAll(async () => {


  await mongoose.createConnection(String(config.MONGODUMMY_CONNECT));
});

beforeEach(async () => {
  await User.deleteMany();
  await Url.deleteMany();
});


afterEach(async () => {
  await User.deleteMany();
  await Url.deleteMany();
});
afterAll(async () => {
  await User.deleteMany();
  await Url.deleteMany();
  await mongoose.disconnect();
  await server.close();

});

describe("url", () => {


    it("POST /url/shorten is it working", async () => {
      const { token } = await registerTest({username : "yusuf",password : "yusuf123"});


      const res = await request(app)
      .post("/url/shorten")
      .set("Authorization", token)
      .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
      exampleShortUrl = res.body.result.shortUrl;
console.log(res.body)
      expect(res.body).not.toEqual({});
      expect(res.body.result.shortUrl).toBeDefined();
      expect(res.body.token).toBeDefined();
      expect(res.body.result.shortUrl).toBe(exampleShortUrl);
      expect(res.statusCode).toBe(200);
      
      

      console.log("res.bodydwadwadwadawdwadwadadawwda:", res.body);

    });
    it("POST /url/shorten fails when originalUrl is wrong", async () => {
      const {token} = await registerTest({username : "yusuf", password :"yusuf123"});
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization", token)
       .send({
         originalUrl: "",
       });

       console.log("yusufn tokeni burada haberin ola haaaaaaaa" , res.body)
       
       expect(res.body.error).toBeDefined();
       expect(res.statusCode).toBe(400);
     });

     it("POST /url/shorten fails when token wrong", async () => {
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization", "qwe123")
       .send({
         originalUrl: "",
       });
       
       expect(res.body.error).toBeDefined();
       expect(res.statusCode).toBe(401);
     });

     it("POST /url/shorten fails when token is empty", async () => {
      await registerTest({username : "yusuf", password :"yusuf123"});
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization","" )
       .send({
         originalUrl: "",
       });
       expect(res.statusCode).toBe(401);
       expect(res.body.error).toBeDefined();
     });


    it("POST /url/shorten fails when originalUrl is empty", async () => {
     const {token} = await registerTest({ username : "yusuf", password :"yusuf123"});

      const res = await request(app)
      .post("/url/shorten")
      .set("Authorization", token)
      .send({
        originalUrl: "",
      });
      
      expect(res.body).not.toEqual({});
      expect(res.body.error).toBeDefined();
      expect(res.statusCode).toBe(400);
    });
  



    it("POST /url/shortUrl is it working", async () => {
    const forexample = await shortUrl();
      const res = await request(app)
        .post("/url/shortUrl")
        .send({forexample })
        console.log("buda utils shorurl geliyormu die kotnrol ederim ha" , forexample)
        expect(res.statusCode).toBeGreaterThan(200);
    });

    it("POST /url/shortUrl is wrong", async () => {
      const res = await request(app)
        .post("/url/shortUrl")
        .send("qwe123")

        expect(res.statusCode).toBe(404);
    });
    

    it("POST /url/shortUrl fails when shorturl is empty", async () => {
      const res = await request(app).post("/url/shortUrl").send({
        shortUrl: "",
      });
    
      expect(res.statusCode).toBe(404); 
    
    });
    

 
  });