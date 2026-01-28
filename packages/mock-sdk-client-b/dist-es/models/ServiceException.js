export class ServiceException extends Error {
    constructor(options) {
        super(options.message);
        this.name = options.name;
        this.$fault = options.$fault;
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}
