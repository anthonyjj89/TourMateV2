# @repo/auth

Authentication package for the TourMate application.

## Features

- JWT-based authentication
- Secure password hashing with bcrypt
- Cookie-based token management
- User registration and login
- Password update functionality
- Profile management
- Type-safe authentication service

## Usage

### Authentication Service

```typescript
import { AuthenticationService, type AuthService } from "@repo/auth";

// Initialize with your database implementation
const authService = new AuthenticationService({
  database: {
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
  },
});

// Register a new user
const { user, token } = await authService.registerUser(
  "user@example.com",
  "password123",
  "John Doe"
);

// Validate credentials
const user = await authService.validateCredentials(
  "user@example.com",
  "password123"
);

// Generate auth token
const token = await authService.generateAuthToken(user);

// Update password
await authService.updatePassword(
  userId,
  currentPassword,
  newPassword
);

// Update profile
const updatedUser = await authService.updateProfile(userId, {
  name: "New Name",
  email: "new@example.com",
});
```

### Token Management

```typescript
import {
  signToken,
  verifyToken,
  setAuthCookie,
  getAuthCookie,
  clearAuthCookie,
} from "@repo/auth";

// Create a new token
const token = await signToken({
  sub: user.id,
  email: user.email,
  role: user.role,
});

// Verify token
const payload = await verifyToken(token);

// Cookie management in API routes
setAuthCookie(res, token);
const token = getAuthCookie(req.headers.cookie);
clearAuthCookie(res);
```

### Middleware Helper

```typescript
import { validateRequest } from "@repo/auth";

// Use in API middleware
const payload = await validateRequest(req.headers.cookie);
```

## Error Handling

The package exports standard error messages and uses custom error types from `@repo/shared`:

```typescript
import { AUTH_ERRORS } from "@repo/auth";

// Available error messages
AUTH_ERRORS.INVALID_CREDENTIALS
AUTH_ERRORS.USER_NOT_FOUND
AUTH_ERRORS.EMAIL_IN_USE
AUTH_ERRORS.INVALID_TOKEN
AUTH_ERRORS.NO_TOKEN
AUTH_ERRORS.INVALID_PASSWORD
```

## Security Features

- Passwords are hashed using bcrypt with a cost factor of 10
- JWTs are signed using HS256 algorithm
- Cookies are httpOnly and secure in production
- Token refresh mechanism for long-term sessions
- Automatic token expiration after 7 days
- Protection against timing attacks in password comparison
- Input validation for all operations

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

## Environment Variables

- `JWT_SECRET`: Secret key for signing JWTs (required)
- `NODE_ENV`: Environment setting, affects cookie security
