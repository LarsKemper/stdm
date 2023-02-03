import { jwtSecretKey } from '../lib/contants';
import jwt from 'jsonwebtoken';

/**
 * Generates jwt token
 *
 * @param {number} id User id
 * @returns {string} jwt token
 */
export function generateToken(id: number): string {
  const token = jwt.sign({ id }, jwtSecretKey, {
    expiresIn: '10h',
  });
  return token;
}
