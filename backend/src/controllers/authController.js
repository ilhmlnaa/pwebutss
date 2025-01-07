import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import response from "../utils/response.js";
import jsonwebtoken from "jsonwebtoken";

const prisma = new PrismaClient();

export const authLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return response(400, null, "NPM and password are required", res);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return response(404, null, "User not found", res);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return response(401, null, "Invalid password", res);
    }

    const jwt = jsonwebtoken.sign(
      {
        npm: user.npm,
        nama: user.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    response(200, { jwt_token: jwt }, "OK", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};

export const authRegister = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return response(400, null, "Username, password and confirmPassword are required", res);
  }

  if (password !== confirmPassword) {
    return response(
      400,
      null,
      "Password and confirm password do not match",
      res
    );
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    response(201, result, "OK", res);
  } catch (error) {
    response(500, null, error.message, res);
  }
};
