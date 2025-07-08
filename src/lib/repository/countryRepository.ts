import { supabase } from "$lib/supabase";
import { Country } from "$lib/models/Country";

/**
 * Repository object for performing read operations on the `country` table.
 * This table stores countries along with relevant metadata including ISO codes,
 * international dialing codes, and currency relationships.
 *
 * The country table references the `currency` table via `currency_id`, allowing
 * association of each country with its official monetary unit.
 */
const countryRepository = {
  /**
   * Retrieves all countries from the database, including their associated currency.
   *
   * @returns {Promise<Country[]>} - A promise that resolves to an array of `Country`
   * model instances. Each country includes embedded `currency` data if available.
   *
   * This is typically used to populate forms, validate user addresses, or configure
   * region-specific settings such as default currency display.
   */
  async getAll(): Promise<Country[]> {
    const { data, error } = await supabase
      .from("country")
      .select("*, currency:currency(*)");

    if (error || !data) {
      console.error("Failed to fetch countries:", error?.message);
      return [];
    }

    return data.map(Country.fromJSON);
  },

  /**
   * Retrieves a single country by its unique identifier, including related currency.
   *
   * @param {number} id - The ID of the country to retrieve.
   *
   * @returns {Promise<Country | null>} - A promise that resolves to a `Country`
   * instance with currency details if found, or `null` otherwise.
   *
   * Useful when editing a country record, showing detailed information,
   * or validating related foreign keys.
   */
  async getById(id: number): Promise<Country | null> {
    const { data, error } = await supabase
      .from("country")
      .select("*, currency:currency(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Country with ID ${id} not found.`, error?.message);
      return null;
    }

    return Country.fromJSON(data);
  }
};

export default countryRepository;
