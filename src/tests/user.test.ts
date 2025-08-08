import index from '../index'
const { app, mongoose , server } = index;
import request from 'supertest'
import config from '../config/config'
import { registerTest } from './auth.utils';
import jwt from 'jsonwebtoken'
import User from '../models/user'
import Url from '../models/url'





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

describe("User", () => {
  it("GET /user/myurls is it working", async () => {
    const { token } = await registerTest({username :"yusuf", password : "yusuf123"});
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", token);
console.log("dwadwadawdwadadawwa" , res.body);
    expect(res.body).not.toEqual({});
    expect(res.statusCode).toBe(200);
   
  });

  it("GET /user/myurls is empty", async () => {
    const { token } = await registerTest({username :"yusuf", password : "yusuf123"});
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", token);
      console.log("merhabalar bu is emptynin tokenidir haberiniz ola" , token)
      expect(res.body).toEqual({ myurls: [] });
      expect(res.statusCode).toBe(200);

   
  });

  it("GET /user/myurls is with wrong token", async () => {
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", "qwe123");

      expect(res.body.error).toBeDefined();

      expect(res.statusCode).toBe(401);

   
  });

  it("GET /user/myurls without token", async () => {
    const res = await request(app).get("/user/myurls");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
   
  });

  it("GET /user/myurls with expired token", async () => {
    const expiredToken = jwt.sign({ id: "fakeid" }, String(config.JWT_SECRET_KEY), { expiresIn: -10 });
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });


   
  

  


  it("GET /user/list is it working", async () => {
    const res = await request(app).get("/user/list");

    
    expect(res.body).not.toEqual({});
    expect(res.statusCode).toBe(200);
  });

  it("GET /user/list is empty", async () => {
    const res = await request(app).get("/user/list");

    
    expect(res.body).toEqual([]);
    expect(res.statusCode).toBe(200);
  });

 
});