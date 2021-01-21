import { HttpStatus } from "src/utils/http-status";
import { SuccessResponse } from "./SuccessResponse";

export class NoContentSuccess extends SuccessResponse {
  constructor(data: any) {
    super(HttpStatus.NO_CONTENT, data)
  }
  static create() {
    return { statusCode: HttpStatus.NO_CONTENT, data: undefined }
  }
}