import { Player } from '../shared/types';
import { conn } from '../lib/db';
import { RowDataPacket } from 'mysql2/index';

// player schema here if needed

export enum PlayerQueries {
  GET_ALL = 'SELECT * FROM player',
  GET_BY_ID = "SELECT *, (SELECT JSON_OBJECT('name', country.name, 'flagUrl', country.flagUrl) FROM country WHERE country.id = player.countryId) AS country FROM player WHERE id = ?",
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
): Promise<Player[] | Player | undefined> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (!params) {
        if (!result || !Array.isArray(result)) {
          return resolve(undefined);
        }

        resolve(result as Player[]);
      }

      const row = (<RowDataPacket>result)[0];
      if (!row) {
        return resolve(undefined);
      }

      resolve({
        id: row.id,
        name: row.name,
        position: row.position,
        number: row.number,
        height: row.height,
        weight: row.weight,
        birthDate: row.birthDate,
        avatarUrl: row.avatarUrl,
        teamId: row.teamId,
        countryId: row.countryId,
        country: row.country,
      });
    });
  });
}
