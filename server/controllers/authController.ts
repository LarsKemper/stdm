import { object, string } from 'yup';
import {
  InvalidRequestError,
  InternalServerError,
} from './../shared/exceptions/Exceptions';
import {
  createUser,
  getUserByEmail,
  getUserById,
  userSchema,
} from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/token.service';
import bcrypt from 'bcrypt';

/**
 * Register a new user
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const valid = userSchema.isValidSync(req.body);

    if (!valid) {
      throw new InvalidRequestError();
    }

    if (await getUserByEmail(req.body.email)) {
      throw new InvalidRequestError('User already exists');
    }

    const userId = await createUser(req.body);

    if (!userId) {
      throw new InternalServerError('Could not create user');
    }

    const user = await getUserById(req.body.email);

    if (!user) {
      throw new InternalServerError();
    }

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user.id),
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Login a user
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const valid = object()
      .shape({
        email: string().email().required(),
        password: string().required(),
      })
      .isValidSync(req.body);

    if (!valid) {
      throw new InvalidRequestError();
    }

    const user = await getUserByEmail(req.body.email);

    if (!user) {
      throw new InvalidRequestError('No user with this email found');
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      throw new InvalidRequestError('Incorrect password');
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user.id),
      },
    });
  } catch (err) {
    next(err);
  }
}
