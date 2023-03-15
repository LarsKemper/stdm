import { Request, Response, NextFunction } from 'express';
import {InternalServerError, InvalidRequestError, NotFoundError} from "../shared/exceptions/Exceptions";
import {getLeagues, LeagueQueries} from "../models/League";
import {conn} from "../lib/db";
import {League} from "../shared/types";
import {getTeams, TeamQueries} from "../models/Team";

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

        if (!(await getLeagues(LeagueQueries.GET_BY_ID, (params.leagueId as string)))) {
            throw new NotFoundError('League not found');
        }

        const currentYear = new Date().getFullYear();
        const currentSeason = `${(currentYear - 1).toString()}/${currentYear.toString()}`

        const table = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM leagueTable WHERE leagueId = ? AND season = ? ORDER BY points DESC', [params.leagueId, currentSeason], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (!result || !Array.isArray(result)) {
                    return resolve(undefined);
                }

                resolve(result as League[]);
            });
        });

        if (!table) {
            throw new InternalServerError();
        }

        res.status(200).json({
            success: true,
            table: table
        });
    } catch (err) {
        next(err);
    }
}

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

        if (!(await getTeams(TeamQueries.GET_BY_ID, (params.teamId as string)))) {
            throw new NotFoundError('Team not found');
        }

        const currentYear = new Date().getFullYear();
        const currentSeason = `${(currentYear - 1).toString()}/${currentYear.toString()}`

        const games = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM gameView WHERE homeTeamId = ? AND season = ? ORDER BY date ASC', [params.teamId, currentSeason], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (!result || !Array.isArray(result)) {
                    return resolve(undefined);
                }

                resolve(result);
            });
        });

        if (!games) {
            throw new InternalServerError();
        }

        res.status(200).json({
            success: true,
            games: games
        });
    } catch (err) {
        next(err);
    }
}
