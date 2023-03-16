import { conn } from '../lib/db';
import {Team} from '../shared/types';
import {RowDataPacket} from "mysql2/index";

export enum TeamQueries {
  GET_ALL = "SELECT team.id, team.name, team.clubId, (SELECT JSON_OBJECT('name', c.name, 'stadium', c.stadium, 'logoUrl', c.logoUrl, 'website', c.website, 'primaryColor', c.primaryColor, 'secondaryColor', c.secondaryColor, 'address', c.address, 'city', c.city) FROM club c WHERE c.id = team.clubId) AS club FROM team",
  GET_BY_ID = "SELECT team.id, team.name, team.clubId, (SELECT JSON_OBJECT('name', c.name, 'stadium', c.stadium, 'logoUrl', c.logoUrl, 'websiteUrl', c.websiteUrl, 'primaryColor', c.primaryColor, 'secondaryColor', c.secondaryColor, 'address', c.address, 'city', c.city) FROM club c WHERE c.id = team.clubId) AS club FROM team WHERE id = ?",
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
): Promise<Team[] | Team | undefined> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (!params) {
        if (!result || !Array.isArray(result)) {
          return resolve(undefined);
        }

        resolve(result as Team[]);
      }

      const row = (<RowDataPacket>result)[0];
      if (!row) {
        return resolve(undefined);
      }

      resolve({
        id: row.id,
        name: row.name,
        clubId: row.clubId,
        leagueId: row.leagueId,
        club: row.club
      });
    });
  });
}
