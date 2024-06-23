class DbError {
  statusCode: number;
  data: [];
  success: boolean;
  message:string;

  constructor() {
    this.success = false;
    this.statusCode = 404;
    this.message = "No Data Found";
    this.data = [];
  }
}

export { DbError };
