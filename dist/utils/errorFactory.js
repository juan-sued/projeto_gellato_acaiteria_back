"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidden = exports.unprocessableEntity = exports.unauthorized = exports.conflict = exports.notFound = void 0;
function notFound(entity) {
    return {
        type: "error_not_found",
        message: `${entity} was not found.`,
    };
}
exports.notFound = notFound;
function conflict(message) {
    return {
        type: "error_conflict",
        message,
    };
}
exports.conflict = conflict;
function unauthorized(entity) {
    return {
        type: "error_unauthorized",
        message: `There is no ${entity} in the request.`,
    };
}
exports.unauthorized = unauthorized;
function unprocessableEntity(messages) {
    return {
        type: "error_unprocessable_entity",
        message: messages,
    };
}
exports.unprocessableEntity = unprocessableEntity;
function forbidden() {
    return {
        type: "error_forbidden",
        message: "Email or password are invalid.",
    };
}
exports.forbidden = forbidden;
//# sourceMappingURL=errorFactory.js.map