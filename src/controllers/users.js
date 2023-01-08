const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkingUser = async (username) => {
  const user = await UserModel.findOne({ username }).exec();
  if (user) {
    throw "Usuário já existe";
  }

  return user;
};

const encryptingPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return encryptedPassword;
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    await checkingUser(username);
    const encryptedPassword = await encryptingPassword(password);
    const createdUser = await UserModel.create({
      username,
      password: encryptedPassword,
    });

    return res.status(200).json(createdUser);
  } catch (error) {
    if (error === "Usuário já existe") {
      return res.status(400).json({ message: "Usuário já existente." });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }).exec();
    const checkingPassword = await bcrypt.compare(password, user.password);
    if (!checkingPassword || !user) {
      return res.status(400).json({ message: "Usuário ou senha incorreta" });
    }

    if (username !== "desafiosharenergy") {
      return res
        .status(403)
        .json({ message: "O usuário não tem autorização." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, {
      expiresIn: "8h",
    });

    return res
      .status(200)
      .json({ id: user._id, username: user.username, token });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const list = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "O usuário com esse id não foi encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      return res
        .status(404)
        .json({ message: "O usuário com esse id não foi encontrado" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    await checkingUser(username);
    const encryptedPassword = await encryptingPassword(password);

    await UserModel.findByIdAndUpdate(id, {
      username,
      password: encryptedPassword,
    });

    return res.status(204).send();
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      return res
        .status(404)
        .json({ message: "O usuário com esse id não foi encontrado" });
    }
    if (error === "Usuário já existe") {
      return res
        .status(400)
        .json({ message: "Usuário com esse username já existe." });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.findByIdAndRemove(id);

    return res.status(204).send();
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      return res
        .status(404)
        .json({ message: "O usuário com esse id não foi encontrado" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const checkingToken = async (req, res) => {
  const { token } = req.body;
  try {
    const check = await jwt.verify(token, process.env.JWT_PASSWORD);
    Input.log(check);
  } catch (error) {
    if (error.message == "jwt expired")
      return res
        .status(401)
        .json({ message: "Por favor, faça login novamente" });
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
module.exports = {
  register,
  login,
  list,
  findById,
  update,
  remove,
  checkingToken,
};
