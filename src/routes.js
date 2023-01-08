const express = require("express");
const routes = express();
const {
  register,
  login,
  list,
  findById,
  update,
  remove,
  checkingToken,
} = require("./controllers/users");
const ClientController = require("./controllers/clients");

routes.get("/users", list);
routes.get("/users/:id", findById);
routes.post("/sing-up", register);
routes.post("/login", login);
routes.post("/users/verify-token", checkingToken);
routes.put("/users/:id", update);
routes.delete("/users/:id", remove);

routes.get("/clients", ClientController.show);
routes.post("/clients", ClientController.store);
routes.get("/clients/:id", ClientController.index);
routes.put("/clients/:id", ClientController.update);
routes.delete("/clients/:id", ClientController.destroy);

module.exports = routes;
