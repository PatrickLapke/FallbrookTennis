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

describe("GET /api/tennisCourts", () => {
  it("Returns courts successfully", async () => {
    const payload = {
      startTime: "2023-08-05T06:00:00.000+00:00",
      endTime: "2023-08-05T07:00:00.000+00:00",
    };

    const response = await request(app).get("/api/tennisCourts").query(payload);

    expect(response.status).toBe(200);
  });
});

describe("POST /api/tennisCourts", () => {
  it("Posts a booking successfully", async () => {
    const payload = {
      startTime: "2023-08-05T09:00:00.000+00:00",
      endTime: "2023-08-05T10:00:00.000+00:00",
      courtId: "64ad54502a74f6e1a7cc5daf",
      userId: "64b157facf333470419e4810",
    };

    const response = await request(app)
      .post("/api/tennisCourts/bookings")
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("Returns a 404 error of no tennis courts found given a wrong ID", async () => {
    const payload = {
      startTime: "2023-08-05T09:00:00.000+00:00",
      endTime: "2023-08-05T10:00:00.000+00:00",
      courtId: "64982b0da8a5665b73b373df",
      userId: "64b157facf333470419e4810",
    };

    const response = await request(app)
      .post("/api/tennisCourts/bookings")
      .send(payload);
    expect(response.status).toBe(404);
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
