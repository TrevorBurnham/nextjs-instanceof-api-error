import { NextResponse } from "next/server";
import { throwError } from "sdk";
import { checkError } from "sdk2";

// sdk throws error, sdk2 checks it
// Both register "MyError" in the shared registry
export async function GET() {
  try {
    throwError();
  } catch (e) {
    return NextResponse.json(checkError(e));
  }
}
