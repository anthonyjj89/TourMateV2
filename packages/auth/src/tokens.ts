import { SignJWT, jwtVerify } from "jose";
import { serialize, parse } from "cookie";
import { type User } from "@repo/types";
import { AuthenticationError } from "@repo/shared";
import type { NextApiResponse } from "next";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-development-secret"
);

const COOKIE_NAME = "auth-token";

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: User["role"];
  iat?: number;
  exp?: number;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  return new SignJWT({ ...payload, iat, exp })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate required fields
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      !payload.role ||
      !["user", "guide", "admin"].includes(payload.role as string)
    ) {
      throw new AuthenticationError("Invalid token payload");
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role as User["role"],
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    throw new AuthenticationError("Invalid or expired token");
  }
}

export function setAuthCookie(res: NextApiResponse, token: string): void {
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  res.setHeader("Set-Cookie", cookie);
}

export function getAuthCookie(cookies: string | undefined): string | undefined {
  if (!cookies) return undefined;
  const parsedCookies = parse(cookies);
  return parsedCookies[COOKIE_NAME];
}

export function clearAuthCookie(res: NextApiResponse): void {
  const cookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", cookie);
}

export async function refreshToken(token: string): Promise<string> {
  const payload = await verifyToken(token);
  
  // Only refresh if token is close to expiring (e.g., less than 24 hours left)
  if (payload.exp && payload.exp - Math.floor(Date.now() / 1000) < 60 * 60 * 24) {
    return signToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });
  }
  
  return token;
}

// Middleware helper
export async function validateRequest(
  cookies: string | undefined
): Promise<JWTPayload> {
  const token = getAuthCookie(cookies);
  if (!token) {
    throw new AuthenticationError("No authentication token found");
  }

  return verifyToken(token);
}
