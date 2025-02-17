export class ApiError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
    this.success = status < 400;
  }
}
