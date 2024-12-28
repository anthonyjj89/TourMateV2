# TourMate

A modern tour booking platform built with Next.js, TypeScript, and MongoDB.

## Project Structure

This is a monorepo using Turborepo with the following packages:

- `apps/web`: Next.js web application
- `packages/auth`: Authentication utilities
- `packages/config`: Shared configuration
- `packages/database`: MongoDB models and services
- `packages/shared`: Shared utilities
- `packages/types`: TypeScript type definitions
- `packages/ui`: Shared UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tourmate.git
cd tourmate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
cp packages/config/.env.example .env

# Edit .env with your values
# Required variables:
# - MONGODB_URI
# - MONGODB_DB_NAME
# - JWT_SECRET
# - COOKIE_SECRET
```

4. Run the development server:
```bash
npm run dev
```

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build all packages
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

### Package Scripts

Each package has its own scripts that can be run using Turborepo:

```bash
# Example: Run database tests
npm run test:connection -w @repo/database
npm run test:user -w @repo/database
```

## Deployment

This project is set up for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## Environment Variables

Required environment variables:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=your_database_name

# Authentication
JWT_SECRET=your_jwt_secret_key
COOKIE_SECRET=your_cookie_secret_key

# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Storage
STORAGE_TYPE=local
STORAGE_LOCAL_PATH=./uploads
```

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
