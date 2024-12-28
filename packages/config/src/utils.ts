import { config } from "./loader";
import type { Env } from "./schema";

export function isProduction(): boolean {
  return config.server.NODE_ENV === "production";
}

export function isDevelopment(): boolean {
  return config.server.NODE_ENV === "development";
}

export function isTest(): boolean {
  return config.server.NODE_ENV === "test";
}

export function getConfig(): Env {
  return config;
}
