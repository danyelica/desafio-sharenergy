const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD);
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Não autorizado" });
    }
    req.usuario = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = { authorization };
