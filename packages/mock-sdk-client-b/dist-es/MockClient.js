import { AccessDeniedException } from "./models/errors";
export class MockClient {
    async send() {
        throw new AccessDeniedException({ message: "Access denied" });
    }
}
