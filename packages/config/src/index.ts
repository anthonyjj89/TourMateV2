export * from "./schema";
export * from "./loader";
export * from "./utils";

// Re-export types
export type { Env } from "./schema";

// Constants
export const CONFIG_ERRORS = {
  INVALID_CONFIG: "Invalid configuration",
  MISSING_ENV: "Missing environment variables",
  INVALID_ENV: "Invalid environment variable value",
  LOAD_ERROR: "Failed to load configuration",
} as const;

// Export singleton config instance
export { config } from "./loader";
