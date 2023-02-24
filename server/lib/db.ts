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

    process.argv.forEach(function (val) {
      if (val === '--demodata') {
        buildDatabase();
        demoData();
      } else if (val === '--build-db') {
        buildDatabase();
      }
    });
  } catch (error) {
    throw new Error(`failed to initialized pool: ${error}`);
  }
}
/**
 * Builds the database
 *
 */
function buildDatabase() {
  const initQuery = fs
    .readFileSync('./resources/stdm-db-v2.sql')
    .toString()
    .replace(/[\n\r]/g, '')
    .split(';');

  initQuery.forEach((e) => {
    if (!e || e.length < 1) {
      return;
    }

    conn.query(e, (err) => {
      if (err) {
        throw new Error(`failed to initialize database: ${err}`);
      }
    });
  });
}
/**
 * Adds demodata
 *
 */
function demoData() {
  const files = fs.readdirSync('./resources/seed/');
  files.forEach((filename) => {
    const querry = fs
      .readFileSync('./resources/seed/' + filename)
      .toString()
      .replace(/[\n\r]/g, '')
      .split(';');

    querry.forEach((e) => {
      if (!e || e.length < 1) {
        return;
      }

      conn.query(e, (err) => {
        if (err) {
          throw new Error(`failed to initialize database: ${err}`);
        }
      });
    });
  });
}
