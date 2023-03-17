import { Request, Response, NextFunction } from 'express';
import {
  InternalServerError,
  InvalidRequestError,
  NotFoundError,
} from '../shared/exceptions/Exceptions';
import { getLeagues, LeagueQueries } from '../models/League';
import { conn } from '../lib/db';
import { League } from '../shared/types';
import { getTeams, TeamQueries } from '../models/Team';
import { RowDataPacket } from 'mysql2/index';

export enum ViewQueries {
  GET_TABLE_BY_LEAGUE_ID = 'SELECT * FROM leagueTable WHERE leagueId = ? AND season = ? ORDER BY points DESC',
  GET_GAMES_BY_GAMES_BY_TEAM_ID = 'SELECT * FROM gameView WHERE homeTeamId = ? OR awayTeamId = ? AND season = ? ORDER BY date ASC',
  GET_GAME_BY_ID = 'SELECT * FROM gameView WHERE id = ?',
  GET_GAME_EVENTS_BY_GAME_ID = "SELECT *, (SELECT JSON_OBJECT('name', player.name, 'avatarUrl', player.avatarUrl) FROM player WHERE player.id = gameEventTeamView.activePlayer) AS activePlayer FROM gameEventTeamView WHERE gameId = ? ORDER BY minute DESC",
}

/**
 * get table by query leagueId
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getTable(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;

    if (!params.leagueId) {
      throw new InvalidRequestError('League id is missing');
    }

    if (
      !(await getLeagues(LeagueQueries.GET_BY_ID, params.leagueId as string))
    ) {
      throw new NotFoundError('League not found');
    }

    const currentYear = new Date().getFullYear();
    const currentSeason = `${(
      currentYear - 1
    ).toString()}/${currentYear.toString()}`;

    const table = await new Promise((resolve, reject) => {
      conn.query(
        ViewQueries.GET_TABLE_BY_LEAGUE_ID,
        [params.leagueId, currentSeason],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          if (!result || !Array.isArray(result)) {
            return resolve(undefined);
          }

          resolve(result as League[]);
        }
      );
    });

    if (!table) {
      throw new InternalServerError();
    }

    res.status(200).json({
      success: true,
      table: table,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * get games by query teamId
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;

    if (!params.teamId) {
      throw new InvalidRequestError('Team id is missing');
    }

    if (!(await getTeams(TeamQueries.GET_BY_ID, params.teamId as string))) {
      throw new NotFoundError('Team not found');
    }

    const games = await new Promise((resolve, reject) => {
      conn.query(
        ViewQueries.GET_GAMES_BY_GAMES_BY_TEAM_ID,
        [params.teamId, params.teamId, getCurrentSeason()],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          if (!result || !Array.isArray(result)) {
            return resolve(undefined);
          }

          resolve(result);
        }
      );
    });

    if (!games) {
      throw new InternalServerError();
    }

    res.status(200).json({
      success: true,
      games: games,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * get game by query gameId
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getGame(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = req;

    if (!params.gameId) {
      throw new InvalidRequestError('Game id is missing');
    }

    const game = await new Promise((resolve, reject) => {
      conn.query(ViewQueries.GET_GAME_BY_ID, [params.gameId], (err, result) => {
        if (err) {
          return reject(err);
        }

        const row = (<RowDataPacket>result)[0];
        if (!row) {
          return resolve(undefined);
        }

        resolve(row);
      });
    });

    if (!game) {
      throw new InternalServerError();
    }

    res.status(200).json({
      success: true,
      games: game,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * get game events by query gameId
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 */
export async function getGameEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;

    if (!params.gameId) {
      throw new InvalidRequestError('Game id is missing');
    }

    const events = await new Promise((resolve, reject) => {
      conn.query(
        ViewQueries.GET_GAME_EVENTS_BY_GAME_ID,
        [params.gameId],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          if (!result || !Array.isArray(result)) {
            return resolve(undefined);
          }

          resolve(result);
        }
      );
    });

    if (!events) {
      throw new InternalServerError();
    }

    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * get current season string: "pastYear/currentYear"
 *
 * @returns {string} current season string
 */
function getCurrentSeason(): string {
  const currentYear = new Date().getFullYear();
  return `${(currentYear - 1).toString()}/${currentYear.toString()}`;
}
