const ERRORS = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  413: 'Payload Too Large',
  415: 'Unsupported Media Type',
  429: 'Too Many Request',
  500: 'Internal Server Error'
}

type ErrorCode = keyof typeof ERRORS

export default class ServiceError extends Error {
  status: ErrorCode

  constructor (status: ErrorCode, message?: string) {
    super(message || ERRORS[status as ErrorCode] || 'Unknown Error')
    this.status = status
  }
}
