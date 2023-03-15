import { Request, Response, NextFunction } from 'express';
import {InternalServerError, InvalidRequestError, NotFoundError} from "../shared/exceptions/Exceptions";
import {getLeagues, LeagueQueries} from "../models/League";
import {conn} from "../lib/db";
import {League} from "../shared/types";

export async function getTable(
    req: Request,
    res: Response,
    next: NextFunction
) {
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

    try {
        res.status(201).json({
            success: true,
            table: table
        });
    } catch (err) {
        next(err);
    }
}
