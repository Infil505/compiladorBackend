const express = require("express");
const routes = require("./routes/rutas.js");
const sincronizar = require("./middleware/sincronizador.js");

const app = express();
app.use(express.json());

// Rutas
app.use("/compiler", routes); 

module.exports = app;
