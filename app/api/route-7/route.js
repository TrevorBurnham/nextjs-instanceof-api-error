import { NextResponse } from "next/server";
import { MockClient } from "mock-sdk-client-b";
import { checkError } from "error-checker";

const client = new MockClient();

export async function GET() {
  try {
    await client.send();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ client: "B", ...checkError(error) });
  }
}
