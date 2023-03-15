import { Request, Response, NextFunction } from 'express';
import {InternalServerError, InvalidRequestError, NotFoundError} from '../shared/exceptions/Exceptions';
import { getTeams, TeamQueries } from '../models/Team';
import {getLeagues, LeagueQueries} from "@models/League";

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

    res.status(200).json({
      success: true,
      teams,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTeam(
    req: Request,
    res: Response,
    next: NextFunction
) {
  try {
    const { params } = req;

    if (!params.teamId) {
      throw new InvalidRequestError('Team id is missing');
    }

    const team = await getTeams(TeamQueries.GET_BY_ID, params.teamId);

    if (!team) {
      throw new InternalServerError('Could not fetch team');
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (err) {
    next(err);
  }
}
