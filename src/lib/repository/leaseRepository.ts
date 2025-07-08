import { supabase } from "$lib/supabase";
import Lease from "$lib/models/Lease";

/**
 * Repository object for handling access to the `lease` table.
 * Each lease represents a legal rental agreement between a tenant and a property unit.
 *
 * Key relationships:
 * - `unit_id`: Foreign key referencing the rented unit.
 * - `tenant_user_id`: References the `app_user` (tenant) involved in the lease.
 * - `currency_id`: References the `currency` used for the rent amount.
 *
 * Lease records store contract period, rental amount, optional termination date,
 * a link to the digital contract, and administrative notes.
 */
const leaseRepository = {
  /**
   * Retrieves all lease records from the database, including unit, tenant, and currency metadata.
   *
   * @returns {Promise<Lease[]>} - A promise that resolves to an array of `Lease`
   * model instances, each including full relationship context.
   *
   * This method is commonly used in owner dashboards, tenant portals, or for generating
   * financial and legal reports.
   */
  async getAll(): Promise<Lease[]> {
    const { data, error } = await supabase
      .from("lease")
      .select("*, unit:unit(*), tenant_user:app_user(*), currency:currency(*)");

    if (error || !data) {
      console.error("Failed to fetch leases:", error?.message);
      return [];
    }

    return data.map(Lease.fromJSON);
  },

  /**
   * Retrieves a single lease record by its unique identifier.
   *
   * @param {number} id - The ID of the lease to retrieve.
   *
   * @returns {Promise<Lease | null>} - A promise resolving to a `Lease` model instance
   * with embedded unit, tenant, and currency data if found, or `null` if not found.
   *
   * Useful for displaying full lease details, validating contract periods, or
   * calculating revenue from individual agreements.
   */
  async getById(id: number): Promise<Lease | null> {
    const { data, error } = await supabase
      .from("lease")
      .select("*, unit:unit(*), tenant_user:app_user(*), currency:currency(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Lease with ID ${id} not found.`, error?.message);
      return null;
    }

    return Lease.fromJSON(data);
  }
};

export default leaseRepository;
