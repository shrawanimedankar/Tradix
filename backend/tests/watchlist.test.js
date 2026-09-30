import request from "supertest";
import { describe, test, expect } from "vitest";
const app = require("../index");

describe("Watchlist API", () => {
  test("get watchlist with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/watchlist")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Watchlist fetched successfully");
    expect(response.body.data).toBeDefined();
  });

  test("get watchlist without token", async () => {
    const response = await request(app).get("/watchlist");

    expect(response.statusCode).toBe(401);
  });

  test("reject invalid stock", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/watchlist/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "ABCBANK",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Stock not found");
  });

   test("adds valid stock to watchlist", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .post("/watchlist/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TECHM",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Stock added to watchlist");
  });

  // test("reject duplicate stock in watchlist", async () => {
  //   const loginResponse = await request(app).post("/auth/login").send({
  //     email: "shrawani@gmail.com",
  //     password: "Shrawani@1234",
  //   });
  //   const token = loginResponse.body.data.token;

  //   const response = await request(app)
  //     .post("/watchlist/add")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       name: "BAJAJFINS",
  //       price: 500,
  //       isDown: false,
  //       percent: "1.50%",
  //     });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.message).toBe("Stock already exists in watchlist");
  // });

  //   test("remove stock from watchlist", async () => {
  //     const loginResponse = await request(app).post("/auth/login").send({
  //       email: "shrawani@gmail.com",
  //       password: "Shrawani@1234",
  //     });
  //     const token = loginResponse.body.data.token;

  //     const response = await request(app)
  //       .delete("/watchlist/remove/TESTSTOCK")
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.message).toBe("Stock removed from watchlist");
  //   });

});
