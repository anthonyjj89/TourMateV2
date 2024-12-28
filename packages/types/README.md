# @repo/types

Shared TypeScript type definitions for the TourMate application.

## Usage

Import types directly from the package:

```typescript
import { Tour, User, Booking } from "@repo/types";

// Use in your components/functions
const tour: Tour = {
  id: "1",
  title: "Mountain Trek",
  // ... other properties
};

// Use in API responses
const getTour = async (id: string): Promise<ApiResponse<Tour>> => {
  // Implementation
};

// Use in components
interface TourCardProps {
  tour: Tour;
  onBook: (tourId: string) => void;
}
```

## Available Types

### Core Types

- `User` - User account information
- `Tour` - Tour details and properties
- `Location` - Geographical location information
- `Booking` - Tour booking information
- `Review` - Tour review data

### API Types

- `ApiResponse<T>` - Generic API response wrapper
- `PaginatedResponse<T>` - Paginated API response wrapper

### Search and Filter Types

- `TourFilters` - Tour filtering options
- `SearchParams` - Search parameters including pagination

## Development

1. Add or modify types in `src/index.ts`
2. Run `npm run build` to compile
3. Run `npm run type-check` to verify types
4. Run `npm run lint` to check for any issues

## Best Practices

1. Keep types focused and single-responsibility
2. Use descriptive names and include JSDoc comments for complex types
3. Use strict types over `any`
4. Leverage TypeScript's utility types when appropriate
5. Keep types in sync with your database schema
6. Version control breaking changes appropriately

## Contributing

When adding new types:

1. Ensure they are properly exported in `index.ts`
2. Add appropriate JSDoc comments
3. Consider backwards compatibility
4. Update this README if adding major new type categories
