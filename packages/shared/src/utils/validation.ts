import { z } from "zod";
import type { Tour, User, Booking, Review } from "@repo/types";

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5, "Email must be at least 5 characters")
  .max(255, "Email must be less than 255 characters");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const tourSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  duration: z.number().min(30).max(24 * 60), // 30 minutes to 24 hours
  price: z.number().min(0),
  maxGroupSize: z.number().min(1).max(50),
  difficulty: z.enum(["easy", "moderate", "difficult"]),
  startDates: z.array(z.date()).min(1),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
    address: z.string(),
    city: z.string(),
    country: z.string()
  })
}) satisfies z.ZodType<Partial<Tour>>;

export const bookingSchema = z.object({
  tourId: z.string().uuid(),
  startDate: z.date(),
  participants: z.number().min(1).max(50),
}) satisfies z.ZodType<Partial<Booking>>;

export const reviewSchema = z.object({
  tourId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(500)
}) satisfies z.ZodType<Partial<Review>>;

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: emailSchema.optional(),
  currentPassword: z.string().optional(),
  newPassword: passwordSchema.optional()
}).refine(data => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required when setting a new password"
}) satisfies z.ZodType<Partial<User>>;

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  difficulty: z.enum(["easy", "moderate", "difficult"]).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minDuration: z.number().min(30).optional(),
  maxDuration: z.number().max(24 * 60).optional(),
  minRating: z.number().min(1).max(5).optional(),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sort: z.string().optional()
}).refine(data => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "Minimum price must be less than or equal to maximum price"
}).refine(data => {
  if (data.minDuration && data.maxDuration) {
    return data.minDuration <= data.maxDuration;
  }
  return true;
}, {
  message: "Minimum duration must be less than or equal to maximum duration"
}).refine(data => {
  if (data.startDate && data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Start date must be before or equal to end date"
});
