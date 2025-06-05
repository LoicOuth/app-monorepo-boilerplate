export enum LogLevel {
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
}
export enum HttpStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  QuotaExceeded = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  BadGateway = 502,
  NoContent = 204,
  UnprocessableEntity = 422,
}

export interface HttpToastError {
  summary: string
  detail: string
}
