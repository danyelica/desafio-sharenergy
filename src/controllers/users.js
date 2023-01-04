const UserModel = require("../Models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username }).exec();
  if (user) {
    return res.status(400).json({ mensage: "The user already exists." });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const createdUser = await UserModel.create({
    username,
    password: encryptedPassword,
  });

  return res.status(200).json(createdUser);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username }).exec();
  if (!user) {
    return res.status(404).json({ mensage: "The user does not exist." });
  }

  const checkingPassword = await bcrypt.compare(password, user.password);
  if (!checkingPassword) {
    return res.status(400).json({ mensage: "The password is wrong." });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, {
    expiresIn: "8h",
  });

  return res.status(200).json({ id: user._id, username: user.username, token });
};

module.exports = { register, login };
