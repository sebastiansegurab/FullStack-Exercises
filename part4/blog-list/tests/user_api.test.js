const mongoose = require("mongoose");
const { app, server } = require("../index");
const User = require("../models/User");
const {
  api,
  initialUsers,
  usersInDB,
  usernamesInBD,
} = require("../utils/helpers");

beforeEach(async () => {
  await User.deleteMany({});
  for (const user of initialUsers) {
    const userToSave = new User(user);
    await userToSave.save();
  }
});

describe("create a user", () => {
  test("considering the restrictions, result succesfull", async () => {
    const userTest = {
      username: "aaaaaaaa",
      password: "12345",
      name: "Sebastian",
    };
    await api.post("/api/users").send(userTest).expect(201);
    const users = await usersInDB();
    expect(users).toHaveLength(initialUsers.length + 1);
    const usernames = await usernamesInBD();
    expect(usernames).toContain(userTest.username);
  });

  test("with a two characters password, fail", async () => {
    const userTest = {
      username: "bbbbbbb",
      password: "12",
      name: "Sebastian",
    };
    const response = await api.post("/api/users").send(userTest);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "The password must have three characters at least."
    );
    const users = await usersInDB();
    expect(users).toHaveLength(initialUsers.length);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  server.close();
  done();
});
