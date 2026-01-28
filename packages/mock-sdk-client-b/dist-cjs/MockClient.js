"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./models/errors");
class MockClient {
    async send() {
        throw new errors_1.AccessDeniedException({ message: "Access denied" });
    }
}
exports.MockClient = MockClient;
