// an error that carries an HTTP status with it
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
