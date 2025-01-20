const express = require("express");
const { compiladorCmas } = require("../services/servicio_compilador.js");
const { AuthService } = require("../middleware/auth.js");
const UserController = require("../controllers/usuario_controller.js"); 

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
    }

    try {
        const decoded = AuthService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado', error });
    }
};

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/profile', verifyToken, UserController.profile);

// rutas del compilador
router.post("/run", verifyToken, async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "Perdón, pero no has digitado código alguno para probar." });
    }
    if (code.includes("system(")) {
        return res.status(400).json({ error: "Espera, has intentado código no permitido." });
    }
    if (code.length > 5000) {
        return res.status(400).json({ error: "Disculpa, pero has superado la extensión permitida." });
    }
    try {
        const output = await compiladorCmas(code);
        res.json({ output });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
