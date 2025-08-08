import index from '../index'
const { app, mongoose , server } = index;

import request from 'supertest'
import { registerTest } from './auth.utils';
import config from '../config/config'
import User from '../models/user'


beforeAll(async () => {


  await mongoose.createConnection(String(config.MONGODUMMY_CONNECT));
});

beforeEach(async () => {
  await User.deleteMany();
});


afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {

  await User.deleteMany();

  await mongoose.disconnect();
  await server.close();

});

describe("auth", () => {
  it("POST /auth/register is it working", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "yusuf",
      password: "yusuf123",
    });
    expect(res.body).not.toEqual({});
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.token).toBeDefined();
    expect(res.statusCode).toBe(201);
  });

  it("POST /auth/register fails when username and password is empty", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "",
      password: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toEqual({});
    expect(res.body.error).toBeDefined();
  });

  it("POST /auth/login is it working", async () => {
    await registerTest({ username: "yusuf", password: "yusuf123" });

    const res = await request(app).post("/auth/login").send({
      username: "yusuf",
      password: "yusuf123",
    });

    expect(res.body).not.toEqual({});
    expect(res.body.message).toBe('Login successful');
    expect(res.body.token).toBeDefined();
    expect(res.statusCode).toBe(200);
  });

  it("POST /auth/login fails when user input wrong username and password", async () => {
    await registerTest({ username: "yusuf", password: "yusuf123" });

    const res = await request(app).post("/auth/login").send({
      username: "wronguser",
      password: "wrongpass",
    });

    expect(res.body).not.toEqual({});
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  it("POST /auth/login fails when username and password is empty", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "",
      password: "",
    });

    expect(res.body).not.toEqual({});
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });
});
