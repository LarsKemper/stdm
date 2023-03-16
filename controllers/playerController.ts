import { Request, Response, NextFunction } from 'express';
import { getPlayers, PlayerQueries } from '../models/Player';
import {
  InternalServerError,
  InvalidRequestError,
} from '../shared/exceptions/Exceptions';

/**
 * get all players
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getAllPlayers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await getPlayers(PlayerQueries.GET_ALL);

    if (!players) {
      throw new InternalServerError('Could not fetch players');
    }

    res.status(200).json({
      success: true,
      players,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * get player by query id
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getPlayer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;

    if (!params.playerId) {
      throw new InvalidRequestError('Player id is missing');
    }

    const player = await getPlayers(PlayerQueries.GET_BY_ID, params.playerId);

    if (!player) {
      throw new InternalServerError('Could not fetch player');
    }

    res.status(200).json({
      success: true,
      player,
    });
  } catch (err) {
    next(err);
  }
}
