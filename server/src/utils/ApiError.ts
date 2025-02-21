export class ApiError<E> {
  public success;
  constructor(
    public statusCode: number,
    public message: string,
    public data?: E,
  ) {
    this.success = statusCode < 400;
  }
}
