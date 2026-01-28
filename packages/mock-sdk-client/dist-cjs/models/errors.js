"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceException_1 = require("./ServiceException");
const mock_smithy_core_1 = require("mock-smithy-core");

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

// Register the error type
mock_smithy_core_1.registerError("AccessDeniedException", AccessDeniedException);
