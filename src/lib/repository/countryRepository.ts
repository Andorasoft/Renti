import { supabase } from '$lib/supabase';
import { Country } from "$lib";

/**
 * Country Repository
 *
 * Provides access to the `country` table, including joined currency information.
 * This repository is used to manage available countries and their associated currencies.
 */
const countryRepository = {
  /**
   * Retrieve all countries with their associated currency.
   *
   * @returns An array of `Country` instances. Returns an empty array if an error occurs.
   */
  async getAll(): Promise<Array<Country>> {
    const { data, error } = await supabase
      .from("country")
      .select(`
        *,
        currency(*)
        `);

    return error ? [] : data.map(Country.fromJSON);
  },

  /**
   * Retrieve a specific country by its ID, including its currency.
   *
   * @param id - The ID of the country.
   * @returns A `Country` instance if found, otherwise `null`.
   */
  async getById(id: number): Promise<Country | null> {
    const { data, error } = await supabase
      .from("country")
      .select(`
        *,
        currency(*)
        `)
      .eq("id", id);

    return error || !data || data.length === 0 ? null : Country.fromJSON(data[0]);
  },

  /**
   * Retrieve a country by its name, including currency data.
   *
   * @param name - The name of the country (e.g., "Ecuador").
   * @returns A `Country` instance if found, otherwise `null`.
   */
  async getByName(name: string): Promise<Country | null> {
    const { data, error } = await supabase
      .from("country")
      .select(`
        *,
        currency(*)
        `)
      .eq("name", name);

    return error || !data || data.length === 0 ? null : Country.fromJSON(data[0]);
  }
};

export default countryRepository;