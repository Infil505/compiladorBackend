const Usuario = require('../models/usuario'); // Ajusta la ruta según tu estructura

const usuarioController = {
    // Crear un nuevo usuario
    async crearUsuario(req, res) {
        try {
            const { correo, password, nombre, tipoDeUsuario } = req.body;
            if (!correo || !password || !nombre || !tipoDeUsuario) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }
            const usuarioExistente = await Usuario.findOne({ where: { correo } });
            if (usuarioExistente) {
                return res.status(400).json({ error: 'El correo ya está registrado.' });
            }
            const nuevoUsuario = await Usuario.create({ correo, password, nombre, tipoDeUsuario });
            res.status(201).json({
                message: 'Usuario creado exitosamente.',
                usuario: { correo: nuevoUsuario.correo, nombre: nuevoUsuario.nombre, tipoDeUsuario: nuevoUsuario.tipoDeUsuario }
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Método de login
    async login(req, res) {
        try {
            const { correo, password } = req.body;

            if (!correo || !password) {
                return res.status(400).json({ error: 'Correo y password son obligatorios.' });
            }

            const usuario = await Usuario.findOne({ where: { correo } });

            if (!usuario || !usuario.validarPassword(password)) {
                return res.status(401).json({ error: 'Credenciales inválidas.' });
            }

            res.status(200).json({
                message: 'Login exitoso.',
                usuario: { correo: usuario.correo, nombre: usuario.nombre, tipoDeUsuario: usuario.tipoDeUsuario }
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un usuario por ID
    async obtenerUsuarioPorId(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener todos los usuarios
    async obtenerTodosLosUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar un usuario por ID
    async actualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { correo, password, nombre, tipoDeUsuario } = req.body;

            const usuarioExistente = await Usuario.findByPk(id);

            if (!usuarioExistente) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const datosActualizados = { correo, nombre, tipoDeUsuario };
            if (password) {
                datosActualizados.password = password; // La encriptación se maneja en el modelo
            }

            const usuarioActualizado = await usuarioExistente.update(datosActualizados);

            res.status(200).json({
                message: 'Usuario actualizado exitosamente.',
                usuario: { correo: usuarioActualizado.correo, nombre: usuarioActualizado.nombre, tipoDeUsuario: usuarioActualizado.tipoDeUsuario }
            });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar un usuario por ID
    async eliminarUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            await usuario.destroy();
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};

module.exports = usuarioController;
