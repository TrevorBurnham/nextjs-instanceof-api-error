"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceException_1 = require("./ServiceException");
class AccessDeniedException extends ServiceException_1.ServiceException {
    constructor(opts) {
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
    }
}
exports.AccessDeniedException = AccessDeniedException;
