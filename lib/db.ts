import { createConnection, Connection } from 'mysql2';
import { dbHost, dbUser, dbPwd, dbName } from './contants';
import fs from 'fs';

export let conn: Connection;

/**
 * Initializes the database
 *
 * @returns {void}
 */
export function intiDatabase(): void {
  try {
    conn = createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPwd,
      database: dbName,
    });

    const sql = fs.readFileSync('./resources/stdm-db-v1.sql').toString();
    conn.query(sql);
  } catch (error) {
    throw new Error(`failed to initialized pool: ${error}`);
  }
}
