module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[t|j]s$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!nanoid/)"],
};
