import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../lib/contants';
import { UnauthorizedError } from '../shared/exceptions/Exceptions';
import { Request, Response, NextFunction } from 'express';

/**
 * Protect middleware
 * Checks the request contains a valid JWT token
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function protectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    jwt.verify(token, jwtSecretKey, (err) => {
      if (err) {
        throw new UnauthorizedError('Not authorized to access this route');
      }
    });

    next();
  } catch (err) {
    next(err);
  }
}
