require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const Loaders = require("./loaders");

Loaders.start();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3003;

app.listen(port);
