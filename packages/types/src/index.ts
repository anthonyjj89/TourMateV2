// User types
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "guide" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseUser {}

export interface DatabaseUser extends BaseUser {
  password: string;
}

// Tour types
export interface Tour {
  id: string;
  title: string;
  description: string;
  location: Location;
  duration: number; // in minutes
  price: number;
  maxGroupSize: number;
  difficulty: "easy" | "moderate" | "difficult";
  rating: number;
  ratingsCount: number;
  images: string[];
  startDates: Date[];
  guideId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  city: string;
  country: string;
}

// Booking types
export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  startDate: Date;
  participants: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  tourId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Search and Filter types
export interface TourFilters {
  difficulty?: Tour["difficulty"];
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  location?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface SearchParams extends TourFilters {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
