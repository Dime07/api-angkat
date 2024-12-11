import { beforeAll, describe, expect, it, spyOn } from "bun:test";
import Elysia from "elysia";
import { authRouter } from "../presentation/router/auth-router";
import { authService } from "../infrastructure/ioc/container";
import { mockUser } from "./data";

const app = new Elysia().use(authRouter);

describe("Auth Router", () => {
  beforeAll(() => {
    spyOn(authService, "register").mockResolvedValue(mockUser);
    spyOn(authService, "login").mockResolvedValue(mockUser);
  });

  it("should return status 200, when register succesful", async () => {
    const response = await app.handle(
      new Request("http://localhost/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: mockUser.name,
          email: mockUser.email,
          password: mockUser.password,
        }),
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("should return status 200, when login succesful", async () => {
    const response = await app.handle(
      new Request("http://localhost/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mockUser.email,
          password: mockUser.password,
        }),
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
