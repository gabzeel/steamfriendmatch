import * as fs from 'fs';
import User from "../models/entities/User";

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

  res.send({...user});
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

    res.send(user);
};

const uploadProfilePhoto = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await User.findOne(id);

  if (!user) {
    res.status(500).send({error: 'User not found'})
    return;
  }
  const fileName = `profile-${Date.now()}`;
  const file = `${__dirname}/../../files/${fileName}.jpg`;

  fs.writeFile(file, req.files.file.data, (error) => {
    if (error) {
      res.status(500).send({error: 'Internal server error'})
    }

    user.profilePhotoFile = fileName;
    user.save();

    res.send({fileKey: fileName})
  })

};

export { getUsers, getUserById, createUser, updateUser, uploadProfilePhoto };
