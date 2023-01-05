const express = require("express");
const routes = express();
const {
  register,
  login,
  list,
  findById,
  update,
  remove,
} = require("./controllers/users");

routes.get("/users", list);
routes.get("/users/:id", findById);
routes.post("/sing-up", register);
routes.post("/login", login);
routes.put("/users/:id", update);
routes.delete("/users/:id", remove);

module.exports = routes;
