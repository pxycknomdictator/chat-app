export class ApiResponse<S> {
  public success;
  constructor(
    public statusCode: number,
    public message: string,
    public data?: S,
  ) {
    this.success = statusCode < 400;
  }
}
