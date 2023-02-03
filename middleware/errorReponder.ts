import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../shared/exceptions/ResponseError';

/**
 * Error responder middleware
 * Takes thrown errors and sends them to the client as valid JSON Responses
 *
 * @param {ResponseError} error Error to be sent to the client
 * @param {Request} request Request object
 * @param {Response} response Response object
 * @param {NextFunction} next Next function
 */
export function errorResponder(
  error: ResponseError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  response.header('Content-Type', 'application/json');

  const status = error.status || 400;
  response.status(status).send(error.message);
}

/**
 * Responds with a 400 status code and a message when no valid path is found
 *
 * @param {Request} request Request object
 * @param {Response} response Response object
 */
export function invalidPathHandler(request: Request, response: Response) {
  response.status(400);
  response.send('invalid path');
}
