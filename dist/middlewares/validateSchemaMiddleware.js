import { errorFactory } from "../utils";
export var validateSchemaMiddleware = function (schema) {
    return function (request, response, next) {
        var body = request.body;
        var error = schema.validate(body, { abortEarly: false }).error;
        if (error !== undefined) {
            var messages = error === null || error === void 0 ? void 0 : error.details.map(function (detail) { return detail.message; });
            throw errorFactory.unprocessableEntity(messages);
        }
        next();
    };
};
