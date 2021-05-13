import User from "../models/entities/User";
import * as jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const getUsers = async (req: any, res: any) => {
  const users = await User.find();

  res.send(users);
};

const getUserById = async (req: any, res: any) => {};

const createUser = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const user = new User();

  user.name = name;
  user.email = email;
  user.password = password;

  await user.save();

  const jwtToken = jwt.sign({ user }, JWT_SECRET_KEY);

  res.send({ token: jwtToken });
};

const updateUser = async (req: any, res: any) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findOne(id);

    if (!user) {
        return;
    }

    user.name = name;

    user.save();
};

export { getUsers, getUserById, createUser, updateUser };
