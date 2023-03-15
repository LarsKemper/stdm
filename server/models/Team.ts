import { conn } from '../lib/db';
import { Team } from '../shared/types';

export enum TeamQueries {
  GET_ALL = "SELECT team.id, team.name, team.clubId, (SELECT JSON_OBJECT('name', c.name, 'stadium', c.stadium, 'logoUrl', c.logoUrl) FROM club c WHERE c.id = team.clubId) AS club FROM team",
}

/**
 * Gets teams
 *
 * @param {string} sql SQL query
 * @param {Array | string | number} params Query parameters
 * @returns {Promise<Player[]>} Promise which resolves to the result of the query
 */
export async function getTeams(
  sql: string,
  params?: Array<string | number> | string | number
): Promise<Team[] | undefined> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (!result || !Array.isArray(result)) {
        return resolve(undefined);
      }

      resolve(result as Team[]);
    });
  });
}
