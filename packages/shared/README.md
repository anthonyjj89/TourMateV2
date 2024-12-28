# @repo/shared

Shared utilities and helper functions for the TourMate application.

## Installation

This package is part of the TourMate monorepo and is automatically available to other packages and apps in the workspace.

## Usage

Import utilities directly from the package:

```typescript
import {
  formatDate,
  formatPrice,
  calculateTotalPrice,
  AppError,
  tourSchema,
} from "@repo/shared";

// Date formatting
const formattedDate = formatDate(new Date(), "PP"); // "Apr 29, 2023"
const relativeTime = formatRelativeTime(new Date()); // "2 hours ago"

// Price formatting and calculations
const price = formatPrice(99.99); // "$99.99"
const total = calculateTotalPrice(99.99, 2); // 199.98

// Validation
const result = tourSchema.safeParse({
  title: "Mountain Trek",
  price: 99.99,
  // ... other properties
});

// Error handling
try {
  // Your code
} catch (error) {
  const appError = handleError(error);
  console.error(appError.toJSON());
}
```

## Available Utilities

### Date Utilities

- `formatDate`: Format dates using date-fns
- `formatRelativeTime`: Get relative time strings (e.g., "2 hours ago")
- `formatTourDuration`: Format tour duration in hours and minutes
- `isValidDateRange`: Check if a date range is valid
- `getUpcomingDates`: Get future dates from a list of dates

### Currency Utilities

- `formatPrice`: Format numbers as currency strings
- `calculateTotalPrice`: Calculate total price with quantity
- `calculateDiscountedPrice`: Apply percentage discount to price
- `formatPriceRange`: Format a price range
- `calculateTax`: Calculate tax amount and optionally include total
- `formatTaxRate`: Format tax rate as percentage
- `roundToDecimal`: Round number to specified decimal places

### Validation Schemas

- `emailSchema`: Email validation
- `passwordSchema`: Password validation with requirements
- `tourSchema`: Tour data validation
- `bookingSchema`: Booking data validation
- `reviewSchema`: Review data validation
- `userUpdateSchema`: User update data validation
- `searchParamsSchema`: Search parameters validation

### Error Handling

- `AppError`: Base error class
- `ValidationError`: Validation error handling
- `AuthenticationError`: Authentication error handling
- `AuthorizationError`: Authorization error handling
- `NotFoundError`: Resource not found error
- `ConflictError`: Resource conflict error
- `handleError`: Unified error handling function

## Development

1. Add new utilities in the appropriate file under `src/utils/`
2. Export them in `src/index.ts`
3. Run `npm run build` to compile
4. Run `npm run type-check` to verify types
5. Run `npm run lint` to check for any issues

## Best Practices

1. Keep utility functions pure and focused
2. Add proper TypeScript types and documentation
3. Include error handling where appropriate
4. Write unit tests for new utilities
5. Follow the existing patterns for consistency
