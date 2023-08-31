jest.mock("../models/user");
jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "mockedId12345"),
}));

const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../server");

const { User } = require("../models/user");
const mongoose = require("mongoose");

describe("User Verification Route", () => {
  it("should verify a user with a valid token", async () => {
    const mockUser = {
      _id: "some-id",
      name: "Patrick",
      email: "plapke@zagmail.gonzaga.eduu",
      password: "gw312342gseg",
      isVerified: false,
      save: jest.fn(),
    };

    User.findById.mockResolvedValue(mockUser);

    const token = jwt.sign(
      { _id: mockUser._id, isAdmin: mockUser.isAdmin },
      process.env.JWT_PRIVATE_KEY
    );

    const res = await request(app).get(`/api/verify/${token}`);

    expect(res.status).toBe(200);

    const verifiedUser = await User.findById(mockUser._id);
    expect(verifiedUser.isVerified).toBeTruthy();

    expect(mockUser.save).toHaveBeenCalled();
  });

  it("should return an error if no user is found with the token's ID", async () => {
    User.findById.mockResolvedValue(null);

    const token = jwt.sign(
      { _id: "nonexistent-id", isAdmin: false },
      process.env.JWT_PRIVATE_KEY
    );

    const res = await request(app).get(`/api/verify/${token}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid Token: no member was found");
  });

  it("should return an error for an invalid token", async () => {
    const invalidToken = "invalid-token";

    const res = await request(app).get(`/api/verify/${invalidToken}`);

    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid Token: unknown error");
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
