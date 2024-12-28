# @repo/config

Configuration management package for the TourMate application.

## Features

- Environment variable validation using Zod schemas
- Type-safe configuration access
- Automatic environment detection
- Grouped configuration by domain (database, auth, server, etc.)
- Error handling with detailed validation messages

## Usage

### Basic Usage

```typescript
import { config, getConfig, isProduction } from "@repo/config";

// Access configuration directly
const port = config.server.PORT;
const mongoUri = config.database.MONGODB_URI;

// Get full config object
const fullConfig = getConfig();

// Environment helpers
if (isProduction()) {
  // Production-specific code
}
```

### Configuration Schema

The configuration is divided into domains:

```typescript
interface Env {
  database: {
    MONGODB_URI: string;
    MONGODB_DB_NAME: string;
  };
  auth: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    COOKIE_SECRET: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    APPLE_CLIENT_ID?: string;
    APPLE_CLIENT_SECRET?: string;
  };
  server: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    API_URL: string;
    CORS_ORIGIN: string;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX_REQUESTS: number;
  };
  email?: {
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USER: string;
    SMTP_PASS: string;
    EMAIL_FROM: string;
  };
  storage: {
    STORAGE_TYPE: "local" | "s3";
    STORAGE_LOCAL_PATH?: string;
    AWS_REGION?: string;
    AWS_BUCKET_NAME?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
  };
}
```

### Environment Variables

Required environment variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=tourmate

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
COOKIE_SECRET=your-cookie-secret-min-32-chars

# Server Configuration
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Optional: Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
EMAIL_FROM=noreply@example.com

# Optional: Storage Configuration
STORAGE_TYPE=local
STORAGE_LOCAL_PATH=./uploads
```

### Error Handling

The package provides detailed error messages for invalid configurations:

```typescript
import { CONFIG_ERRORS } from "@repo/config";

try {
  // Access config
} catch (error) {
  if (error.message === CONFIG_ERRORS.INVALID_CONFIG) {
    // Handle invalid configuration
  }
  // Handle other errors
}
```

### Helper Functions

```typescript
import {
  isProduction,
  isDevelopment,
  isTest,
  getConfig,
} from "@repo/config";

// Environment checks
if (isDevelopment()) {
  // Development-specific code
}

// Get full config
const config = getConfig();
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Build the package:
```bash
npm run build
```

3. Run type checks:
```bash
npm run type-check
```

4. Run linting:
```bash
npm run lint
```

## Best Practices

1. Always use the typed configuration access
2. Handle configuration errors appropriately
3. Use environment helpers for environment-specific code
4. Keep sensitive information in environment variables
5. Use the validation schema to ensure configuration correctness
6. Group related configuration values in the appropriate domain

## Security Notes

- Never commit sensitive environment variables
- Use strong secrets (min 32 characters) for JWT and cookies
- Keep production configuration separate from development
- Validate all configuration values before use
- Use appropriate security settings in production
