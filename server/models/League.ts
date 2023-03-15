import { conn } from '../lib/db';
import {League, Team} from '../shared/types';
import {RowDataPacket} from "mysql2";

export enum LeagueQueries {
    GET_ALL = 'SELECT * FROM league',
    GET_BY_ID = 'SELECT * FROM league WHERE id = ?',
}

/**
 * Gets leagues
 *
 * @param {string} sql SQL query
 * @param {Array | string | number} params Query parameters
 * @returns {Promise<Player[]>} Promise which resolves to the result of the query
 */
export async function getLeagues(
    sql: string,
    params?: Array<string | number> | string | number
): Promise<League[] | League | undefined> {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }

            if (!params) {
                if (!result || !Array.isArray(result)) {
                    return resolve(undefined);
                }

                resolve(result as League[]);
            }

            const row = (<RowDataPacket>result)[0];
            if (!row) {
                return resolve(undefined);
            }

            resolve({
                id: row.id,
                name: row.name,
            });
        });
    });
}
