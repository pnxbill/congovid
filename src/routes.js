const express = require("express");
const InformeController = require("./controllers/InformeController");
const path = require("path");

const routes = express.Router();

routes.get("/informe", InformeController.index);
routes.post("/informe", InformeController.create);
routes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

module.exports = routes;
