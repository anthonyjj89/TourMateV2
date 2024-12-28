import { config as loadEnv } from "dotenv";
import { ValidationError } from "@repo/shared";
import { envSchema, type Env } from "./schema";
import path from "path";

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), "../../.env");
loadEnv({ path: envPath });

function parseEnvValue(value: string | undefined): string | number | undefined {
  if (value === undefined) return undefined;
  
  // Try to parse as number
  const num = Number(value);
  if (!isNaN(num)) return num;
  
  // Return as string
  return value;
}

function groupEnvByPrefix(env: NodeJS.ProcessEnv) {
  const grouped: Record<string, Record<string, unknown>> = {
    database: {},
    auth: {},
    server: {},
    email: {},
    storage: {},
  };

  for (const [key, value] of Object.entries(env)) {
    // Database config
    if (key.startsWith("MONGODB_")) {
      grouped.database[key] = value;
    }
    // Auth config
    else if (key.startsWith("JWT_") || key.startsWith("COOKIE_") || 
             key.startsWith("GOOGLE_") || key.startsWith("APPLE_")) {
      grouped.auth[key] = value;
    }
    // Server config
    else if (key === "NODE_ENV" || key === "PORT" || key === "API_URL" || 
             key === "CORS_ORIGIN" || key.startsWith("RATE_LIMIT_")) {
      grouped.server[key] = parseEnvValue(value);
    }
    // Email config
    else if (key.startsWith("SMTP_") || key === "EMAIL_FROM") {
      grouped.email[key] = parseEnvValue(value);
    }
    // Storage config
    else if (key.startsWith("STORAGE_") || key.startsWith("AWS_")) {
      grouped.storage[key] = value;
    }
  }

  return grouped;
}

export function loadConfig(): Env {
  try {
    // Group environment variables by their prefix
    const grouped = groupEnvByPrefix(process.env);

    // Merge with default config
    const config = {
      database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
      },
      auth: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
        COOKIE_SECRET: process.env.COOKIE_SECRET,
      },
      server: {
        NODE_ENV: (process.env.NODE_ENV || "development") as "development" | "production" | "test",
        PORT: parseInt(process.env.PORT || "3000", 10),
        API_URL: process.env.API_URL || "http://localhost:3000",
        CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
        RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
        RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
      },
      storage: {
        STORAGE_TYPE: (process.env.STORAGE_TYPE || "local") as "local" | "s3",
        STORAGE_LOCAL_PATH: process.env.STORAGE_LOCAL_PATH || "./uploads",
      },
      ...grouped,
    };

    // Validate the configuration
    const result = envSchema.safeParse(config);

    if (!result.success) {
      const errorsByPath: Record<string, string[]> = {};

      result.error.errors.forEach(err => {
        const path = err.path.join(".");
        if (!errorsByPath[path]) {
          errorsByPath[path] = [];
        }
        errorsByPath[path].push(err.message);
      });

      const errorMessages = Object.entries(errorsByPath)
        .map(([path, messages]) => `${path}: ${messages.join(", ")}`)
        .join("\n");
      
      throw new ValidationError(
        `Invalid configuration:\n${errorMessages}`,
        errorsByPath
      );
    }

    return result.data;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError("Failed to load configuration", { 
      unknown: [error instanceof Error ? error.message : String(error)]
    });
  }
}

// Export a singleton instance of the config
export const config = loadConfig();
