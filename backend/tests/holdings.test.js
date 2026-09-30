import request from "supertest";
import { describe, test, expect } from "vitest";
const app = require("../index");

describe("Holdings API", () => {
  test("get holdings with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/holdings")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Holdings fetched successfully");
    expect(response.body.data).toBeDefined();
  });

  test("get holdings without token", async () => {
    const response = await request(app).get("/holdings");

    expect(response.statusCode).toBe(401);
  });
});