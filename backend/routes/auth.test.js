const mongoose = require("mongoose");
const request = require("supertest");
jest.mock("./users.js", () => jest.fn());
const app = require("../server");

describe("POST /api/auth", () => {
  it("Should return 400 if an invalid email is provided", async () => {
    const payload = {
      email: "JohnDoe.com",
      password: "Test123",
    };

    const response = await request(app).post("/api/auth").send(payload);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"email" must be a valid email');
  });

  it("Should return 400 if the inputted email is not found", async () => {
    const payload = {
      //Adding an exaggerated name to ensure no user has this email
      email: "JohnFplkmng9@gmail.com",
      password: "Test123",
    };

    const response = await request(app).post("/api/auth").send(payload);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid email");
  });

  it("Should return 400 if the inputted password is incorrect", async () => {
    const payload = {
      email: "plapke@zagmail.gonzaga.edu",
      password: "Test123",
    };

    const response = await request(app).post("/api/auth").send(payload);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid password");
  });

  it("Should successfuly login a user with valid email/password and attach token, id, name, and email", async () => {
    const payload = {
      email: "plapke@zagmail.gonzaga.edu",
      password: "hello",
    };

    const response = await request(app).post("/api/auth").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Pat Lap");
    expect(response.body).toHaveProperty("email", "plapke@zagmail.gonzaga.edu");
    const userId = response.body._id;
    expect(mongoose.Types.ObjectId.isValid(userId)).toBe(true);
    expect(response.headers).toHaveProperty("x-auth-token");
    expect(response.headers).toHaveProperty("x-user-id");
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
