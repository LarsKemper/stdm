import { object, string } from 'yup';
import {
  InvalidRequestError,
  InternalServerError,
  NotFoundError,
} from './../shared/exceptions/Exceptions';
import { createUser, userSchema, UserQueries, getUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { generateJwtToken } from '../services/token.service';
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

    if (await getUser(UserQueries.GET_BY_EMAIL, req.body.email)) {
      throw new InvalidRequestError('User already exists');
    }

    const userId = await createUser(req.body);

    if (!userId) {
      throw new InternalServerError('Could not create user');
    }

    const user = await getUser(UserQueries.GET_BY_ID, userId);

    if (!user) {
      throw new InternalServerError();
    }

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: generateJwtToken(user.id),
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

    const user = await getUser(UserQueries.GET_BY_EMAIL, req.body.email);

    if (!user) {
      throw new NotFoundError('No user with this email found');
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      throw new InvalidRequestError('Incorrect password');
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: generateJwtToken(user.id),
    });
  } catch (err) {
    next(err);
  }
}
