"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../models/errors");

// Simulates schema-based error deserialization
function deserializeError(errorCode, message) {
    switch (errorCode) {
        case "AccessDeniedException":
            return new errors_1.AccessDeniedException({ message });
        default:
            return new Error(message);
    }
}
exports.deserializeError = deserializeError;
