import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

/* Zod schema is used for checking type of data that whether it stores in correct format or not before actual usage.  */

// Common
const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      `${field} must have exactly two decimal places (e.g., 49.99)`
    );
//Checking type of product details.
export const ProductInputSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"), //Ex. this is "name" variable that must be "string" type, has min of 3 characters, if not throw error "Name must be at least 3 characters".
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean(),
  price: Price("Price"),
  listPrice: Price("List price"),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative("count in stock must be a non-negative number"),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, "Average rating must be at least 0")
    .max(5, "Average rating must be at most 5"),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative("Number of reviews must be a non-negative number"),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5),
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative("Number of sales must be a non-negative number"),
});
