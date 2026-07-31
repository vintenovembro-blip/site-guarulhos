import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

export function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.API_ACCESS_KEY;
  if (!expected) return false;

  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;

  return timingSafeEqual(expectedBuf, providedBuf);
}
