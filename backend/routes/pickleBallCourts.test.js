const mongoose = require("mongoose");
const request = require("supertest");
jest.mock("./users.js", () => jest.fn());
const app = require("../server");

jest.mock("../middleware/auth", () => {
  return jest.fn((req, res, next) => {
    req.user = { _id: "64b157facf333470419e4810" };
    next();
  });
});

describe("GET /api/pickleballCourts", () => {
  it("Returns courts successfully", async () => {
    const payload = {
      startTime: "2023-08-05T06:00:00.000+00:00",
      endTime: "2023-08-05T07:00:00.000+00:00",
    };

    const response = await request(app)
      .get("/api/pickleballCourts")
      .query(payload);

    expect(response.status).toBe(200);
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});

describe("POST /api/pickleballCourts", () => {
  it("Posts a booking successfully", async () => {
    const payload = {
      startTime: "2023-08-05T09:00:00.000+00:00",
      endTime: "2023-08-05T010:00:00.000+00:00",
      pickleballCourtId: "64982b0da8a5665b73b373de",
      userId: "64b157facf333470419e4810",
    };

    const response = await request(app)
      .post("/api/pickleballCourts/bookings")
      .send(payload);

    expect(response.status).toBe(201);
  });
});
