const express = require("express");
const { compiladorCmas } = require("../services/servicio_compilador.js");
const AuthService = require('../middleware/auth');
const UserController = require("../controllers/usuario_controller.js"); 
const AsistenciaController = require('../controllers/asistencia_controller.js');
const EstatusController = require('../controllers/estatus_controller.js');

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
// rutas de usuario
router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/profile', verifyToken, UserController.profile);

router.post('/logout', verifyToken, UserController.logout);

// rutas de asistencia
router.get('/', AsistenciaController.getAllAsistencias);

router.post('/', AsistenciaController.createAsistencia);

router.get('/:correo', AsistenciaController.getAsistenciasByCorreo);

router.put('/:id', AsistenciaController.updateAsistencia);

router.delete('/:id', AsistenciaController.deleteAsistencia);

// rutas de area *Revisar la relacion y la tabla intermedia que existe ya que no le veo funcionalidad*


// rutas de estatus
router.get('/', EstatusController.getAllEstatus);

router.get('/usuario/:usuarioCorreo', EstatusController.getEstatusByUsuarioCorreo);

router.get('/area/:areaId', EstatusController.getEstatusByAreaId);

router.post('/', EstatusController.createEstatus);

router.put('/:id', EstatusController.updateEstatus);

router.delete('/:id', EstatusController.deleteEstatus);

// rutas preguntas *Revisar la relacion que hay con el area ya que se necesita dividir por tipos, posible sol una tabla de evaluaciones*


// ruta de tutorias


/*-------------------------------------------------------------*/
// rutas del compilador
router.post("/run", verifyToken, async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "Perdón, pero no has digitado código alguno para probar." });
    }
    if (code.includes("system(")) {
        return res.status(400).json({ error: "Espera, has ingresado un código no permitido." });
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
}

);


module.exports = router;
