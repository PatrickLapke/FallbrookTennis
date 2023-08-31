jest.mock("./users.js", () => jest.fn());

jest.mock("../middleware/emailVerification", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

jest.mock("../middleware/auth", () => {
  return jest.fn((req, res, next) => {
    req.user = { _id: "64b157facf333470419e4810" };
    next();
  });
});

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

describe("GET /api/bookings/pickleball", () => {
  it("Returns pickleball courts successfully", async () => {
    const user = {
      _id: "64baae08999b166e18286abf",
    };

    const res = await request(app).get("/api/bookings/pickleball");

    expect(res.status).toBe(200);
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
