import { createConnection, Connection } from 'mysql2';
import { dbHost, dbUser, dbPwd, dbName } from './contants';
import fs from 'fs';
import * as console from 'console';

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
        views();
        triggers();
        demoData();
      } else if (val === '--build-db') {
        buildDatabase();
        views();
        triggers();
      }
    });
  } catch (error) {
    throw new Error(`failed to initialized pool: ${error}`);
  }
}

/**
 * Builds the database
 *
 * @returns {void}
 */
function buildDatabase(): void {
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
 * @returns {void}
 */
function demoData(): void {
  const files = fs.readdirSync('./resources/seed/');
  files.forEach((filename) => {
    const query = fs
      .readFileSync('./resources/seed/' + filename)
      .toString()
      .replace(/[\n\r]/g, '')
      .split(';');

    query.forEach((e) => {
      if (!e || e.length < 1) {
        return;
      }

      conn.query(e, (err) => {
        if (err) {
          console.log(e);
          throw new Error(`failed to add demodata: ${err}`);
        }
      });
    });
  });
}

/**
 * Adds triggers
 *
 * @returns {void}
 */
function triggers(): void {
  const files = fs.readdirSync('./resources/triggers/');
  files.forEach((filename) => {
    const query = fs
      .readFileSync('./resources/triggers/' + filename)
      .toString()
      .replace(/[\n\r]/g, '')
      .split(';');

    query.forEach((e) => {
      if (!e || e.length < 1) {
        return;
      }

      conn.query(e, (err) => {
        if (err) {
          console.log(e);
          throw new Error(`failed to initialize triggers: ${err}`);
        }
      });
    });
  });
}

/**
 * Adds views
 *
 * @returns {void}
 */
function views(): void {
  const files = fs.readdirSync('./resources/views/');
  files.forEach((filename) => {
    const query = fs
      .readFileSync('./resources/views/' + filename)
      .toString()
      .replace(/[\n\r]/g, '')
      .split(';');

    query.forEach((e) => {
      if (!e || e.length < 1) {
        return;
      }

      conn.query(e, (err) => {
        if (err) {
          throw new Error(`failed to initialize views: ${err}`);
        }
      });
    });
  });
}
