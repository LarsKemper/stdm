import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../shared/exceptions/Exceptions';
import { getTeams, TeamQueries } from '../models/Team';

export async function getAllTeams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const teams = await getTeams(TeamQueries.GET_ALL);

    if (!teams) {
      throw new InternalServerError('Could not fetch teams');
    }

    res.status(201).json({
      success: true,
      teams,
    });
  } catch (err) {
    next(err);
  }
}
