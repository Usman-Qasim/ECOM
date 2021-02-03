import bcrypt from "bcryptjs";

const users = [
  {
    name: "Usman Qasim",
    email: "usmanqasim0900@gmail.com",
    password: bcrypt.hashSync("090078601", 10),
    isAdmin: true,
  },
  {
    name: "Ali Qasim",
    email: "aliqasim0900@gmail.com",
    password: bcrypt.hashSync("090078601", 10),
  },
  {
    name: "Hassan Qasim",
    email: "hassanqasim0900@gmail.com",
    password: bcrypt.hashSync("090078601", 10),
  },
];

export default users;
