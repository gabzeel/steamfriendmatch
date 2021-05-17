import * as jwt from "jsonwebtoken";
import User from "../models/entities/User";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SecretTestKey";

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, { select: ["password"] });
  if (user?.password === password) {
    const jwtToken = jwt.sign({ user: { email } }, JWT_SECRET_KEY);
    res.send({ token: jwtToken });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export {
    login
}
