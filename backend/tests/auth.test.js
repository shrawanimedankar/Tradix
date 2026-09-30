import request from "supertest";
import { describe, test, expect } from "vitest";
const app = require("../index");

describe("Signup API", () => {
  test("signup with valid details", async () => {
    const response = await request(app).post("/auth/signup").send({
      fullName: "Vishal Medankar",
      email: "vishal@gmail.com",
      password: "Vishal@123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Account created successfully");
  });

  test("signup with already registered email", async () => {
    const response = await request(app).post("/auth/signup").send({
      fullName: "Shrawani Medankar",
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email already registered");
  });

  test("signup without email", async () => {
    const response = await request(app).post("/auth/signup").send({
      fullName: "Vishal Medankar",
      password: "Vishal@123",
    });

    expect(response.statusCode).toBe(400);
  });

  test("signup with invalid password", async () => {
    const response = await request(app).post("/auth/signup").send({
      fullName: "Vishal Medankar",
      email: "vishal@gmail.com",
      password: "123",
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("Login API", () => {
  // 1. Correct email and password
  test("login with correct credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  // 2. Correct email but wrong password
  test("login with wrong password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Wrong@123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  // 3. Email does not exist
  test("login with wrong email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "doesnotexist@gmail.com",
      password: "Shrawani@123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  // 4. Email is missing
  test("login without email", async () => {
    const response = await request(app).post("/auth/login").send({
      password: "Shrawani@123",
    });

    expect(response.statusCode).toBe(400);
  });

  // 5. Password is missing
  test("login without password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "shrawi@gmail.com",
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("Get Current User API", () => {
  test("get current user with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User fetched successfully");
  });
});

describe("Update Profile API", () => {
  test("update profile with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .put("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullName: "Shrawani Updated",
        email: "shrawani@gmail.com",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Profile updated successfully");
  });

  test("update profile without token", async () => {
    const response = await request(app)
      .put("/auth/profile")
      .send({
        fullName: "Shrawani Updated",
        email: "shrawani@gmail.com",
      });

    expect(response.statusCode).toBe(401);
  });

  test("update profile without required fields", async () => {
    const loginResponse = await request(app)
    .post("/auth/login")
    .send({
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .put("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullName: "Shrawani Updated",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Full name and email are required");
  });
});

describe("Change Password API", () => {
  test("change password with correct current password", async () => {
    const loginResponse = await request(app)
    .post("/auth/login")
    .send({
      email: "shrawani@gmail.com",
      password: "Shrawani@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .put("/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "Shrawani@123",
        newPassword: "Shrawani@1234",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Password changed successfully");
  });

  test("change password with incorrect current password", async () => {
    const loginResponse = await request(app)
    .post("/auth/login")
    .send({
      email: "shrawani@gmail.com",
      password: "Shrawani@1234",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .put("/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "WrongPassword@123",
        newPassword: "Shrawani@1234",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Current password is incorrect");
  });

  test("change password without token", async () => {
    const response = await request(app)
      .put("/auth/change-password")
      .send({
        currentPassword: "Shrawani@123",
        newPassword: "Shrawani@1234",
      });

    expect(response.statusCode).toBe(401);
  });
});

