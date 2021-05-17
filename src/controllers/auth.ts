import * as jwt from "jsonwebtoken";
import User from "../models/entities/User";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SecretTestKey";

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, { select: ["password", "email", "id", "name", "profilePhotoFile"] });

  if (!user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (user.password === password) {
    const jwtToken = jwt.sign({ user: { email: user.email, id: user.id, name: user.name, photoKey: user.profilePhotoFile } }, JWT_SECRET_KEY);
    res.send({ token: jwtToken });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export {
    login
}
