"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceException extends Error {
    constructor(options) {
        super(options.message);
        this.name = options.name;
        this.$fault = options.$fault;
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}
exports.ServiceException = ServiceException;
