import { z } from "zod";

// Database configuration schema
export const databaseConfigSchema = z.object({
  MONGODB_URI: z.string().url("Invalid MongoDB connection string"),
  MONGODB_DB_NAME: z.string().min(1, "Database name is required"),
});

// Authentication configuration schema
export const authConfigSchema = z.object({
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  COOKIE_SECRET: z.string().min(32, "Cookie secret must be at least 32 characters"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  APPLE_CLIENT_ID: z.string().optional(),
  APPLE_CLIENT_SECRET: z.string().optional(),
});

// Server configuration schema
export const serverConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  API_URL: z.string().url("Invalid API URL"),
  CORS_ORIGIN: z.string().url("Invalid CORS origin").default("http://localhost:3000"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
});

// Email configuration schema
export const emailConfigSchema = z.object({
  SMTP_HOST: z.string().min(1, "SMTP host is required"),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().min(1, "SMTP user is required"),
  SMTP_PASS: z.string().min(1, "SMTP password is required"),
  EMAIL_FROM: z.string().email("Invalid sender email address"),
});

// Storage configuration schema
export const storageConfigSchema = z.object({
  STORAGE_TYPE: z.enum(["local", "s3"]).default("local"),
  STORAGE_LOCAL_PATH: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_BUCKET_NAME: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
});

// Combined environment schema
export const envSchema = z.object({
  database: databaseConfigSchema,
  auth: authConfigSchema,
  server: serverConfigSchema,
  email: emailConfigSchema.partial(), // Make email config optional
  storage: storageConfigSchema,
});

// Export type for the validated environment
export type Env = z.infer<typeof envSchema>;

// Default configuration values
export const defaultConfig: Partial<Env> = {
  server: {
    NODE_ENV: "development",
    PORT: 3000,
    API_URL: "http://localhost:3000",
    CORS_ORIGIN: "http://localhost:3000",
    RATE_LIMIT_WINDOW_MS: 60000,
    RATE_LIMIT_MAX_REQUESTS: 100,
  },
  storage: {
    STORAGE_TYPE: "local",
    STORAGE_LOCAL_PATH: "./uploads",
  },
};
