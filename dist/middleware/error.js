"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFound = exports.ErrorConverter = exports.ErrorHandler = void 0;
const ApiError_1 = require("src/error/ApiError");
const NotFound_1 = require("src/error/NotFound");
const CustomError_1 = require("../error/CustomError");
const http_status_1 = require("../utils/http-status");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        return res.status(err.statusCode).json(err.serializeError());
    }
    return res.status(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
};
exports.ErrorHandler = ErrorHandler;
const ErrorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof CustomError_1.CustomError)) {
        const statusCode = error.statusCode || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Something went Wrong';
        error = new ApiError_1.ApiError(statusCode, message);
    }
    next(error);
};
exports.ErrorConverter = ErrorConverter;
const RouteNotFound = (req, res, next) => {
    const err = new NotFound_1.NotFound('Resource you are looking for Not Found');
    return exports.ErrorHandler(err, req, res, next);
};
exports.RouteNotFound = RouteNotFound;
//# sourceMappingURL=error.js.map