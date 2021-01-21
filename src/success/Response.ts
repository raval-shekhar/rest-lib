import { Request, Response, NextFunction } from "express";

import { CreatedSuccess } from "./CreatedSuccess";
import { NoContentSuccess } from "./NoContentSuccess";
import { OkSuccess } from "./OkSuccess";

declare global {
  namespace Express {
    interface Response {
      success: (data: any) => void;
      success200: (data: any) => void;
      success201: (data: any) => void;
      success204: () => void;
    }
  }
}
interface ResponseType {
  statusCode: number,
  data: any;
}
export class ResponseHandler {
  static success(data: any = {}) {
    return (req: Request, res: Response, next: NextFunction) => {
      res.success = (response: ResponseType) => {
        res.status(response.statusCode).json(response.data)
      }
      res.success200 = (data: any) => res.success(OkSuccess.create(data));
      res.success201 = (data: any) => res.success(CreatedSuccess.create(data))
      res.success204 = () => res.success(NoContentSuccess.create())
      next();
    }
  }
}