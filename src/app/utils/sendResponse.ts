class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;
  public token?: string;

  constructor(
    statusCode: number,
    data: T,
    message: string = 'Success',
    token?: string,
  ) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    if (token) {
      this.token = token;
    }
    this.data = data;
  }
}

export { ApiResponse };
