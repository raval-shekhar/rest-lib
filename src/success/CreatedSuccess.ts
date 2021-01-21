import { HttpStatus } from "src/utils/http-status";
import { SuccessResponse } from "./SuccessResponse";

export class CreatedSuccess extends SuccessResponse {
  constructor(data: any) {
    super(HttpStatus.CREATED, data)
  }
  static create(data: any) {
    return { statusCode: HttpStatus.CREATED, data }
  }
}