import { ResponseError } from './ResponseError';

export class BadRequestError extends ResponseError {
  constructor(message?: string) {
    super(400, message || 'There was a problem processing your request.');
  }
}

export class UnauthorizedError extends ResponseError {
  constructor(message?: string) {
    super(401, message || 'You are not authorized to make this request.');
  }
}

export class NotFoundError extends ResponseError {
  constructor(message?: string) {
    super(404, message || 'The requested resource could not be found.');
  }
}

export class UnprocessableEntityError extends ResponseError {
  constructor(message?: string) {
    super(422, message || 'Your request could not be completed.');
  }
}

export class InternalServerError extends ResponseError {
  constructor(message?: string) {
    super(500, message || 'There was an internal server error.');
  }
}

export class MethodNotAllowedError extends ResponseError {
  constructor(message?: string) {
    super(405, message || 'The used request method is not allowed.');
  }
}

export class InvalidRequestError extends ResponseError {
  constructor(message?: string) {
    super(403, message || 'Missing or invalid query.');
  }
}
