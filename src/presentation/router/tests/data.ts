import jwt from "jsonwebtoken";

export const mockUser = {
  email: "test@email.com",
  password: "test123",
  name: "test",
};

export const mockToken = jwt.sign(
  {
    email: mockUser.email,
  },
  "angkatsecret"
);
