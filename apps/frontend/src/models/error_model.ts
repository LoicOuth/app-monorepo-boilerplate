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
}

export class HttpError<T = object> extends Error {
  httpStatus: HttpStatusCode
  responseURL: string
  body?: T

  constructor(message: string, httpStatus: HttpStatusCode, responseURL: string, body?: T) {
    super(message)
    this.name = this.constructor.name
    this.httpStatus = httpStatus
    this.responseURL = responseURL
    this.body = body
  }
}

export interface HttpToastError {
  summary: string
  detail: string
}
