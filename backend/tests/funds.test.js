import request from "supertest";
import { describe, test, expect } from "vitest";
const app = require("../index");

describe("Funds API", () => {
  test("get funds with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/funds")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Funds fetched successfully");
    expect(response.body.data).toBeDefined();
  });

  test("get funds without token", async () => {
    const response = await request(app)
    .get("/funds");

    expect(response.statusCode).toBe(401);
  });

  test("add funds with valid amount", async () => {
    const loginResponse = await request(app)
    .post("/auth/login")
    .send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/funds/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 1000,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Funds added successfully");
  });

  test("add funds with invalid amount", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/funds/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: -500,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Enter a valid amount");
  });

  test("withdraw funds with valid amount", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/funds/withdraw")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 100,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Funds withdrawn successfully");
  });

  test("withdraw more than available funds", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
     email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/funds/withdraw")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 999999999,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Insufficient available funds");
  });
});
