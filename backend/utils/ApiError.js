class ApiError extends Error {
  constructor(statuscode, message, errors = []) {
    super(message);
    this.statuscode = statuscode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
