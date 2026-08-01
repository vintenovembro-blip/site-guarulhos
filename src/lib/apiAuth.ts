import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

function matches(expected: string, provided: string): boolean {
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length === 0 || providedBuf.length === 0) return false;
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}

export function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.API_ACCESS_KEY;
  if (!expected) return false;

  const authHeader = request.headers.get("authorization") ?? "";
  const bearerValue = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  const candidates = [
    bearerValue,
    authHeader, // Authorization enviado sem o prefixo "Bearer "
    request.headers.get("x-api-key") ?? "",
    request.headers.get("apikey") ?? "",
    request.nextUrl.searchParams.get("api_key") ?? "",
    request.nextUrl.searchParams.get("key") ?? "",
  ];

  return candidates.some((c) => c && matches(expected, c));
}
