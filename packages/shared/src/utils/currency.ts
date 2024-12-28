const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

interface FormatPriceOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatPrice = (
  amount: number,
  options: FormatPriceOptions = {}
): string => {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

export const calculateTotalPrice = (basePrice: number, quantity: number): number => {
  return Number((basePrice * quantity).toFixed(2));
};

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Discount percentage must be between 0 and 100");
  }
  const discount = originalPrice * (discountPercentage / 100);
  return Number((originalPrice - discount).toFixed(2));
};

export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  options: FormatPriceOptions = {}
): string => {
  return `${formatPrice(minPrice, options)} - ${formatPrice(maxPrice, options)}`;
};

export const calculateTax = (
  amount: number,
  taxRate: number,
  options: { includeTotal?: boolean } = {}
): { tax: number; total?: number } => {
  const tax = Number((amount * (taxRate / 100)).toFixed(2));
  if (options.includeTotal) {
    return {
      tax,
      total: Number((amount + tax).toFixed(2)),
    };
  }
  return { tax };
};

export const formatTaxRate = (taxRate: number): string => {
  return `${taxRate.toFixed(2)}%`;
};

export const roundToDecimal = (value: number, decimals: number = 2): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};
