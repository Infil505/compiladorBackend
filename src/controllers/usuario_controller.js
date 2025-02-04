const UserService = require('../services/user_service');
const AuthService = require('../middleware/auth');

class UserController {

    static async register(req, res) {
        const { correo, password, nombre, tipoDeUsuario } = req.body;
        try {
            const user = await UserService.createUser({ correo, password, nombre, tipoDeUsuario });
            res.status(201).json({ message: 'Usuario creado exitosamente', user });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
        }
    }

    static async login(req, res) {
        const { correo, password } = req.body;
        try {
            const user = await UserService.validateCredentials(correo, password);
            const token = AuthService.generateToken(user);
            res.status(200).json({ message: 'Login exitoso', token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async profile(req, res) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Acceso denegado. No hay token.' });
        }
        try {
            const decoded = AuthService.verifyToken(token);
            req.user = decoded;
            res.status(200).json({ message: 'Perfil de usuario', user: req.user });
        } catch (error) {
            res.status(400).json({ message: 'Token no válido o expirado' });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(400).json({ message: 'Token requerido' });

            await AuthService.invalidateToken(token);
            return res.json({ message: 'Logout exitoso' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;