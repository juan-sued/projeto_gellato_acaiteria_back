"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaMiddleware = void 0;
const utils_1 = require("../utils");
const validateSchemaMiddleware = (schema) => {
    return (request, response, next) => {
        const body = request.body;
        const { error } = schema.validate(body, { abortEarly: false });
        if (error !== undefined) {
            const messages = error === null || error === void 0 ? void 0 : error.details.map((detail) => detail.message);
            throw utils_1.errorFactory.unprocessableEntity(messages);
        }
        next();
    };
};
exports.validateSchemaMiddleware = validateSchemaMiddleware;
//# sourceMappingURL=validateSchemaMiddleware.js.map