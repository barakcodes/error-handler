import { logger } from "./logger";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

//free to extend the BaseError
// the api error
export class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, isOperational, description);
  }
}

// async function error

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNATHORIZED = 401,
  ACCESS_FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  METHOD_NOT_aLLOWED = 405,
  CONFLICT = 409,
  SERVICE_NOT_FOUND = 503,
}

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    logger.error(
      "Error message from the centralized error-handling component",
      err
    );
    //    await sendMailToAdminIfCritical();
    //    await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();

// send email if critical

export const sendMailToAdminIfCritical = async () => {};
