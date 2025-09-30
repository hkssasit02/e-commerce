import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string; role: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};