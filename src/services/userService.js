const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

class UserService {
    // Crear un nuevo usuario
    static async createUser({ correo, password, nombre, tipoDeUsuario }) {
        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await Usuario.create({
                correo,
                password: hashedPassword,
                nombre,
                tipoDeUsuario,
            });

            return user;
        } catch (error) {
            throw new Error('Error al crear el usuario');
        }
    }

    // Validar las credenciales del usuario
    static async validateCredentials(correo, password) {
        try {
            const user = await Usuario.findOne({ where: { correo } });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }

            return user;
        } catch (error) {
            throw new Error('Error al validar las credenciales');
        }
    }
}

module.exports = UserService;
