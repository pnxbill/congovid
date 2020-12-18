const express = require("express");
const InformeController = require("./controllers/InformeController");

const routes = express.Router();


routes.get("/informe", InformeController.index);
routes.post("/informe", InformeController.create);