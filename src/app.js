const express = require("express");
const routes = require("./routes/rutas.js");
const syncModels = require("./middleware/sincronizador.js");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar modelos antes de iniciar el servidor
(async () => {
  try {
    await syncModels();
    console.log("Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("Error al sincronizar modelos:", error.message);
    process.exit(1); // Detener la aplicación si falla la sincronización
  }
})();

// Definir rutas
app.use("/compiler", routes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;

