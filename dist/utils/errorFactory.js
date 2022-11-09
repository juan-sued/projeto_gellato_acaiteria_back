export function notFound(entity) {
    return {
        type: "error_not_found",
        message: "".concat(entity, " was not found.")
    };
}
export function conflict(message) {
    return {
        type: "error_conflict",
        message: message
    };
}
export function unauthorized(entity) {
    return {
        type: "error_unauthorized",
        message: "There is no ".concat(entity, " in the request.")
    };
}
export function unprocessableEntity(messages) {
    return {
        type: "error_unprocessable_entity",
        message: messages
    };
}
export function forbidden() {
    return {
        type: "error_forbidden",
        message: "Email or password are invalid."
    };
}
