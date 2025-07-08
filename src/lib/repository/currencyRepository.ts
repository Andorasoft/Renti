import { supabase } from "$lib/supabase";
import Currency from "$lib/models/Currency";

/**
 * Repository object for managing operations related to the `currency` table.
 * This includes retrieving all available currencies or a specific currency
 * by its unique identifier. The table is used to define currency metadata
 * such as name, code, and symbol, and is referenced by other entities such
 * as `country` and `lease`.
 */
const currencyRepository = {
  /**
   * Fetches all currency records from the `currency` table.
   *
   * @returns {Promise<Currency[]>} - A promise that resolves to an array of
   * `Currency` model instances representing all currency rows in the database.
   *
   * If the query fails or returns an error, an empty array is returned instead.
   */
  async getAll(): Promise<Currency[]> {
    const { data, error } = await supabase
      .from("currency")
      .select("*");

    if (error || !data) {
      console.error("Failed to fetch currencies:", error?.message);
      return [];
    }

    return data.map(Currency.fromJSON);
  },

  /**
   * Fetches a single currency record by its unique ID.
   *
   * @param {number} id - The unique identifier of the currency to retrieve.
   *
   * @returns {Promise<Currency | null>} - A promise that resolves to a `Currency`
   * model instance if found, or `null` if no matching currency exists or the query fails.
   *
   * This method is typically used when needing detailed information about a specific
   * currency for editing or referencing from a related entity (e.g., country or lease).
   */
  async getById(id: number): Promise<Currency | null> {
    const { data, error } = await supabase
      .from("currency")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Currency with ID ${id} not found.`, error?.message);
      return null;
    }

    return Currency.fromJSON(data);
  }
};

export default currencyRepository;
