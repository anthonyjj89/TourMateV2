export * from "./tokens";
export * from "./service";

// Re-export auth-related types
export type {
  JWTPayload,
} from "./tokens";

export type {
  AuthService,
} from "./service";

// Constants
export const AUTH_COOKIE_NAME = "auth-token";
export const AUTH_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days in seconds

// Error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  EMAIL_IN_USE: "Email already registered",
  INVALID_TOKEN: "Invalid or expired token",
  NO_TOKEN: "No authentication token found",
  INVALID_PASSWORD: "Invalid current password",
} as const;
