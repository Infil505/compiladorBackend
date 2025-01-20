const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

if (!JWT_SECRET) {
  throw new Error('Falta la variable de entorno JWT_SECRET en .env');
}

class AuthService {
  static generateToken(user) {
    const payload = {
      id: user.id,
      tipoUsuario: user.tipoUsuario
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION, algorithm: 'HS256' });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('El token ha expirado, por favor inicia sesión nuevamente');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Token inválido');
      }
      throw new Error('Error al verificar el token');
    }
  }

  static decodeToken(token) {
    return jwt.decode(token, { complete: true });
  }
}

module.exports = AuthService;
