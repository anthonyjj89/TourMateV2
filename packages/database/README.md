# @repo/database

Database package for TourMate, providing MongoDB models and services.

## Features

- MongoDB connection management
- User model and service implementation
- TypeScript support with proper type definitions

## Installation

This package is part of the TourMate monorepo and is not published to npm. It is used internally by other packages.

```bash
# From the root of the monorepo
npm install
```

## Usage

```typescript
import { connectToDatabase, UserService } from "@repo/database";
import { config } from "@repo/config";

// Connect to MongoDB
await connectToDatabase(config.database.MONGODB_URI);

// Create a user service instance
const userService = new UserService();

// Create a new user
const user = await userService.createUser({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
  role: "user",
});

// Find a user by email
const foundUser = await userService.findUserByEmail("user@example.com");

// Update a user
const updatedUser = await userService.updateUser(user.id, {
  name: "Jane Doe",
});

// Delete a user
await userService.deleteUser(user.id);
```

## Testing

The package includes tests for database functionality:

```bash
# Test database connection
npm run test:connection

# Test user service
npm run test:user
```

## API Reference

### Connection Management

- `connectToDatabase(uri: string): Promise<void>`
- `disconnectFromDatabase(): Promise<void>`

### User Service

The `UserService` class provides methods for managing users:

- `findUserByEmail(email: string): Promise<DatabaseUser | null>`
- `findUserById(id: string): Promise<DatabaseUser | null>`
- `createUser(data: CreateUserData): Promise<DatabaseUser>`
- `updateUser(id: string, data: UpdateUserData): Promise<DatabaseUser>`
- `deleteUser(id: string): Promise<void>`

### Models

- `UserModel`: Mongoose model for user documents
- `UserDocument`: TypeScript interface for user documents

## Environment Variables

Required environment variables (defined in @repo/config):

```bash
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=your_database_name
```

## Dependencies

- mongoose: MongoDB object modeling tool
- @repo/config: Configuration package
- @repo/shared: Shared utilities
- @repo/types: TypeScript type definitions
