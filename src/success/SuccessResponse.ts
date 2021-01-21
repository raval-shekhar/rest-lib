export class SuccessResponse {
  statusCode: number;
  data: any = undefined;

  constructor(statusCode: number, data: any) {
    this.statusCode = statusCode;
    this.data = data;
  }

  static create(statusCode: number, data: any) {
    return { statusCode, data }
  }
}