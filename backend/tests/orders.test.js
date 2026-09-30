import request from "supertest";
import {describe, test, expect} from "vitest";
const app = require("../index");

describe("Orders API", () => {
  test("get all orders with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Orders fetched successfully");
    expect(response.body.data).toBeDefined();
  });

  test("get orders without token", async () => {
    const response = await request(app).get("/orders");
    expect(response.statusCode).toBe(401);
  });

  test("place BUY CNC order with valid details", async () => {
    const loginResponse = await request(app)
    .post("/auth/login")
    .send({
       email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "INFY",
        qty: 1,
        mode: "BUY",
        product: "CNC",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Order placed successfully");
  });

  test("reject order with invalid quantity", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "INFY",
        qty: 0,
        mode: "BUY",
        product: "CNC",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Quantity must be a positive whole number",
    );
  });

  test("reject order with invalid stock name", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
       email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "INVALIDSTOCK",
        qty: 1,
        mode: "BUY",
        product: "CNC",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid stock name");
  });

  test("reject BUY order when funds are insufficient", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "MARUTI",
        qty: 999999,
        mode: "BUY",
        product: "CNC",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Insufficient funds");
  });

  test("reject order without authentication", async () => {
    const response = await request(app).post("/orders/new").send({
      name: "INFY",
      qty: 1,
      mode: "BUY",
      product: "CNC",
    });

    expect(response.statusCode).toBe(401);
  });
});

describe("SELL Orders", () => {
  test("sell stock that user owns", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "INFY",
        qty: 1,
        mode: "SELL",
        product: "CNC",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Order placed successfully");
  });

  test("reject selling stock that user does not own", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/orders/new")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TCS",
        qty: 1,
        mode: "SELL",
        product: "CNC",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("You don't own this stock");
  });
});