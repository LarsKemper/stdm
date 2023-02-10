import { jwtSecretKey } from '../lib/contants';
import jwt from 'jsonwebtoken';

/**
 * Generates jwt token
 *
 * @param {number} id User id
 * @returns {string} jwt token
 */
export function generateJwtToken(id: number): string {
  const token = jwt.sign({ id }, jwtSecretKey, {
    expiresIn: '2h',
  });
  return token;
}
