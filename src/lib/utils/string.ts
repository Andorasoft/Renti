import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param str - The input string (e.g. "ecuador")
 * @returns A capitalized string (e.g. "Ecuador")
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Normalizes a URL path by removing a trailing slash, unless it's the root path.
 *
 * @param path - The URL path to normalize (e.g. "/home/")
 * @returns The normalized path (e.g. "/home" or "/" if root)
 */
export function normalize(path: string): string {
  return path === "/" ? "/" : path.replace(/\/$/, '');
}

/**
 * Converts a 2-letter ISO country code into its corresponding emoji flag.
 *
 * @param iso2 - ISO 3166-1 alpha-2 country code (e.g. "EC", "us")
 * @returns Emoji flag string (e.g. "🇪🇨", "🇺🇸")
 */
export function isoToEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

/**
 * Formats a local phone number and country calling code into E.164 format.
 *
 * @param phone - The local phone number (e.g. "0998001122")
 * @param code - The country calling code without "+" (e.g. "593")
 * @returns The phone number in E.164 format (e.g. "+593998001122")
 */
export function formatToE164(phone: string, code: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `+${code}${cleaned}`;
}

/**
 * Generate a short pseudo-unique identifier.
 *
 * Format: XXXX-XXXX using uppercase letters and digits.
 * Used for identifying user records in the `user` table.
 *
 * @returns A custom UUID string.
 */
export function UUID(): string {
  const nano = customAlphabet(alphabet, 8);
  const raw = nano();
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}