"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidationError_1 = require("../error/ValidationError");
const pick_1 = __importDefault(require("../utils/pick"));
const Validate = (schema) => (req, res, next) => {
    const validSchema = pick_1.default(schema, ['params', 'query', 'body']);
    const object = pick_1.default(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        throw new ValidationError_1.ValidationError(error);
    }
    Object.assign(req, value);
    return next();
};
exports.Validate = Validate;
//# sourceMappingURL=validate.js.map