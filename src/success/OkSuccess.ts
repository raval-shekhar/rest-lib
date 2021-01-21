import { HttpStatus } from "src/utils/http-status";
import { SuccessResponse } from "./SuccessResponse";

export class OkSuccess extends SuccessResponse {
  constructor(data: any) {
    super(HttpStatus.OK, data)
  }
  static create(data: any) {
    return { statusCode: HttpStatus.OK, data }
  }
}