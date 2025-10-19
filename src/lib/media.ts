/**
 * Helper function to construct proper media URLs from Strapi
 * Handles both absolute URLs and relative paths
 *
 * @param mediaUrl - The media URL from Strapi (can be absolute or relative)
 * @param baseUrl - Optional base URL to use instead of environment variable
 * @returns Properly formatted media URL
 */
export const getMediaUrl = (mediaUrl: string, baseUrl?: string): string => {
  // Return empty string if no URL provided
  if (!mediaUrl) return "";

  // If URL is already absolute (starts with http or https), return as-is
  if (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) {
    return mediaUrl;
  }

  // Use provided baseUrl or fallback to environment variable
  const strapiUrl =
    baseUrl ||
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ||
    process.env.NEXT_PUBLIC_URL ||
    "";

  // Ensure the URL starts with a slash for proper concatenation
  const normalizedUrl = mediaUrl.startsWith("/") ? mediaUrl : `/${mediaUrl}`;

  // Combine base URL with media path
  return `${strapiUrl}${normalizedUrl}`;
};

/**
 * Helper function specifically for Strapi image objects
 *
 * @param image - Strapi image object with url property
 * @param baseUrl - Optional base URL override
 * @returns Properly formatted image URL or empty string if invalid
 */
export const getImageUrl = (
  image: { url?: string } | null | undefined,
  baseUrl?: string
): string => {
  if (!image?.url) return "";
  return getMediaUrl(image.url, baseUrl);
};

/**
 * Helper function to get multiple image formats from Strapi
 *
 * @param image - Strapi image object with formats
 * @param format - Desired format (thumbnail, small, medium, large)
 * @param fallbackToOriginal - Whether to fallback to original if format not found
 * @returns Properly formatted image URL
 */
export const getImageFormat = (
  image:
    | {
        url?: string;
        formats?: Record<string, { url?: string }>;
      }
    | null
    | undefined,
  format: "thumbnail" | "small" | "medium" | "large",
  fallbackToOriginal: boolean = true
): string => {
  if (!image) return "";

  // Try to get the specific format
  const formatUrl = image.formats?.[format]?.url;
  if (formatUrl) {
    return getMediaUrl(formatUrl);
  }

  // Fallback to original if requested and available
  if (fallbackToOriginal && image.url) {
    return getMediaUrl(image.url);
  }

  return "";
};
