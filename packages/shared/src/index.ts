// Date utilities
export {
  formatDate,
  formatRelativeTime,
  formatTourDuration,
  isValidDateRange,
  getUpcomingDates,
} from "./utils/date";

// Currency utilities
export {
  formatPrice,
  calculateTotalPrice,
  calculateDiscountedPrice,
  formatPriceRange,
  calculateTax,
  formatTaxRate,
  roundToDecimal,
} from "./utils/currency";

// Validation schemas
export {
  emailSchema,
  passwordSchema,
  tourSchema,
  bookingSchema,
  reviewSchema,
  userUpdateSchema,
  searchParamsSchema,
} from "./utils/validation";

// Error handling
export {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  isAppError,
  handleError,
} from "./utils/errors";

// Re-export types from @repo/types for convenience
export type {
  User,
  Tour,
  Booking,
  Review,
  Location,
  ApiResponse,
  PaginatedResponse,
  TourFilters,
  SearchParams,
} from "@repo/types";
