import { NextResponse } from "next/server";
import { fail, check } from "sdk-b";
export const GET = () => {
  try {
    fail();
  } catch (e) {
    return NextResponse.json(check(e));
  }
};
