import request from "supertest";
import app from "../src/app";
import { expect } from "chai";
import { describe, it } from "mocha";
describe("Login Functionality", () => {
  it("should create user with valid credentials", async () => {
    const userData = {
      username: "testuser",
      password: "securepassword",
    };

    const response = await request(app)
      .post("/signup")
      .send(userData)
      .expect(201);

    expect(response.body.success).to.equal(true);
    expect(response.body.message).to.equal("User Created Successfully!");
  });

  it('should return error for missing username', async () => {
    const userData = {
      password: 'securepassword',
    };

    const response = await request(app)
      .post('/signup')
      .send(userData)
      .expect(400);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal('Missing username or password');
  });

  it('should return error for missing password', async () => {
    const userData = {
      username: 'testuser',
    };

    const response = await request(app)
      .post('/signup')
      .send(userData)
      .expect(400);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal('Missing username or password');
  });

  it('should return error for existing username', async () => {
    const userData = {
      username: 'testuser',
      password: 'securepassword',
    };
    const response = await request(app)
      .post('/signup')
      .send(userData)
      .expect(409);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal('Username already exists');
  });
});
