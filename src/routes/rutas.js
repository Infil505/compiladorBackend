const express = require("express");
const { compiladorCmas } = require("../services/servicio_compilador.js");
const { secure } = require("../services/restricciones.js");

const router = express.Router();
// implementar seguridad en las rutas
router.post("/run", async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "Perdón, pero no has digitado código alguno para probar." });
    }
    // Validaciones de seguridad
    if (code.includes("system(")) {
        return res.status(400).json({ error: "Espera, has intentado código no permitido." });
    }
    if (code.length > 5000) {
        return res.status(400).json({ error: "Disculpa, pero has superado la extensión permitida." });
    }
    try {
        secure(code);
        const output = await compiladorCmas(code);
        res.json({ output });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
