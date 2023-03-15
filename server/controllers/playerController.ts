import { Request, Response, NextFunction } from 'express';
import { getPlayers, PlayerQueries } from '../models/Player';
import { InternalServerError } from '../shared/exceptions/Exceptions';

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
