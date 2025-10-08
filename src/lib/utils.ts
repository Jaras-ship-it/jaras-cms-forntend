import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplicating conflicting classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StrapiResponse = {
  data: unknown;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
};

export function flattenAttributes(data: unknown): unknown {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Cast data to StrapiResponse type since we've verified it's an object
  const obj = data as StrapiResponse;
  const flattened: Record<string, unknown> = {};

  // Iterate over each key in the object
  for (const key in obj) {
    // Skip inherited properties from the prototype chain
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(flattened, flattenAttributes(obj[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(obj[key]);
    }
  }

  return flattened;
}
