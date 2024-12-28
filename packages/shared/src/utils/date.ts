import { format, formatDistance, parseISO } from "date-fns";

export const formatDate = (date: Date | string, formatString = "PPP"): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

export const formatTourDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  
  return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
};

export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};

export const getUpcomingDates = (dates: Date[]): Date[] => {
  const now = new Date();
  return dates
    .filter(date => date > now)
    .sort((a, b) => a.getTime() - b.getTime());
};
