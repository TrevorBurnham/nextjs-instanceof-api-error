"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_smithy_core_1 = require("mock-smithy-core");

// Import errors to trigger registration
require("./models/errors");

class MockClient {
    async send(command) {
        throw mock_smithy_core_1.createError("AccessDeniedException", { message: "Access denied" });
    }
}
exports.MockClient = MockClient;
