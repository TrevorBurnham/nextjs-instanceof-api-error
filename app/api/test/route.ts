import { AccessDeniedException } from "my-sdk";

// Import the class from the same package
// In a properly bundled app, this should be the SAME class object
// But with Turbopack's chunk duplication, each route gets its own copy

export async function GET() {
  // Create an error instance
  const error = new AccessDeniedException({ message: "Test error" });
  
  // This should always be true, but fails when class is duplicated
  const isAccessDenied = error instanceof AccessDeniedException;
  
  // Get the class identity info
  const classInfo = {
    isAccessDenied,
    errorName: error.name,
    errorConstructorName: error.constructor.name,
    // This will show if the class objects are the same
    classIdentity: AccessDeniedException.toString().slice(0, 100),
  };
  
  return Response.json(classInfo);
}
