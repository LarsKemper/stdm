import { User } from '../shared/types/user';
import { OkPacket, RowDataPacket } from 'mysql2';
import { conn } from '../lib/db';
import { AnySchema, object, string } from 'yup';
import bcrypt from 'bcrypt';

export const userSchema = object<Record<keyof User, AnySchema>>().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string().required(),
});

/**
 * Creates a new user in the database
 *
 * @param {User} user User the be created
 * @returns {Promise<OkPacket>} Promise which resolves to the result of the query
 */
export async function createUser(user: User): Promise<number> {
  const sql =
    'INSERT INTO Users (id, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)';

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  return new Promise((resolve, reject) => {
    conn.query(
      sql,
      [user.id, user.firstName, user.lastName, user.email, hash],
      (err, result) => {
        if (err) {
          reject(err);
        }

        resolve((result as OkPacket).insertId);
      }
    );
  });
}
/**
 * Gets a user by email
 *
 * @param {string} email Email of the user
 * @returns {Promise<User>} Promise which resolves to the result of the query
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const sql = 'SELECT * FROM Users WHERE email = ?';

  return new Promise((resolve, reject) => {
    conn.query(sql, email, (err, result) => {
      if (err) {
        reject(err);
      }

      const row = (<RowDataPacket>result)[0];
      if (!row) {
        return resolve(undefined);
      }

      resolve({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        password: row.password,
        role: row.role,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      });
    });
  });
}

/**
 * Gets a user by id
 *
 * @param {number} id User id
 * @returns {Promise<User>} Promise which resolves to the result of the query
 */
export async function getUserById(id: number): Promise<User | undefined> {
  const sql = 'SELECT * FROM Users WHERE id = ?';

  return new Promise((resolve, reject) => {
    conn.query(sql, id, (err, result) => {
      if (err) {
        reject(err);
      }

      const row = (<RowDataPacket>result)[0];
      if (!row) {
        return resolve(undefined);
      }

      resolve({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        password: row.password,
        role: row.role,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      });
    });
  });
}
