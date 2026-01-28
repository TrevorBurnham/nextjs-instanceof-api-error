import { AccessDeniedException as ClientAException } from "mock-sdk-client";
import { AccessDeniedException as ClientBException } from "mock-sdk-client-b";

export function checkError(error) {
  // Check against both client error types (like Basin's error-utils does)
  const isClientA = error instanceof ClientAException;
  const isClientB = error instanceof ClientBException;
  
  return {
    isClientA,
    isClientB,
    errorName: error.name,
    errorConstructor: error.constructor.name,
  };
}
