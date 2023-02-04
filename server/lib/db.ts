import { createConnection, Connection } from 'mysql2';
import { dbHost, dbUser, dbPwd, dbName } from './contants';
//import fs from 'fs';

export let conn: Connection;

//const initQuery = fs.readFileSync('./resources/stdm-db-v1.sql', {
//  encoding: 'utf-8',
//});

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

    //conn.query(initQuery, (err) => {
    //  if (err) {
    //    throw new Error(`failed to initialize database: ${err}`);
    //  }

    // eslint-disable-next-line no-console
    //  console.log('database initialized');
    //});
  } catch (error) {
    throw new Error(`failed to initialized pool: ${error}`);
  }
}
