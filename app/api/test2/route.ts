import { AccessDeniedException } from "my-sdk";

// This route also imports AccessDeniedException
// With Turbopack's chunk duplication, this is a DIFFERENT class object
// than the one in /api/test/route.ts

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
