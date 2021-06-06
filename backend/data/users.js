import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ali Moradi",
    email: "ali.moradi.design@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "test",
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
