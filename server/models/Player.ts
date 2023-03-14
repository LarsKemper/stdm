import { Player } from '../shared/types/player';
import { conn } from '../lib/db';

// player schema here if needed

export enum PlayerQueries {
  GET_ALL = 'SELECT * FROM player',
}

/**
 * Gets players
 *
 * @param {string} sql SQL query
 * @param {Array | string | number} params Query parameters
 * @returns {Promise<Player[]>} Promise which resolves to the result of the query
 */
export async function getPlayers(
  sql: string,
  params?: Array<string | number> | string | number
): Promise<Player[] | undefined> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (!result || !Array.isArray(result)) {
        return resolve(undefined);
      }

      resolve(result as Player[]);
    });
  });
}
