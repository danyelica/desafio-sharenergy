const express = require("express");
const routes = express();
const { register, login } = require("./controllers/users");

routes.get("/", (req, res) => {
  res.json({ mensagem: "api rodando" });
});

routes.post("/sing-up", register);
routes.post("/login", login);

module.exports = routes;
