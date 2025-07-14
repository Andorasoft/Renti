import { Currency } from "./Currency";
import { Unit } from "./Unit";
import { User } from "./User";

/**
 * Represents a lease agreement between a tenant and a unit.
 */
export class Lease {
  /** Unique identifier of the lease */
  id: number;

  /** Start date of the lease (YYYY-MM-DD) */
  start_date: string;

  /** End date of the lease (YYYY-MM-DD) */
  end_date: string;

  /** Optional termination date (YYYY-MM-DD) */
  termination_date?: string;

  /** Amount of rent agreed in the lease */
  rent_amount: number;

  /** Optional URL to the lease contract document */
  contract_url?: string;

  /** Optional notes about the lease */
  notes?: string;

  /** Foreign key to the unit */
  unit_id: number;

  /** Full unit object (optional) */
  unit?: Unit;

  /** Foreign key to the tenant user */
  tenant_user_id: number;

  /** Full user object (optional) */
  tenant_user?: User;

  /** Foreign key to the currency used */
  currency_id: number;

  /** Full currency object (optional) */
  currency?: Currency;

  /**
   * Creates a new Lease instance.
   * @param id - Lease ID
   * @param start_date - Start date
   * @param end_date - End date
   * @param termination_date - Optional termination date
   * @param rent_amount - Rent value
   * @param contract_url - Optional contract URL
   * @param notes - Optional notes
   * @param unit_id - Unit foreign key
   * @param unit - Optional unit object
   * @param tenant_user_id - Tenant foreign key
   * @param tenant_user - Optional user object
   * @param currency_id - Currency foreign key
   * @param currency - Optional currency object
   */
  constructor(
    id: number,
    start_date: string,
    end_date: string,
    termination_date: string | undefined,
    rent_amount: number,
    contract_url: string | undefined,
    notes: string | undefined,
    unit_id: number,
    unit: Unit | undefined,
    tenant_user_id: number,
    tenant_user: User | undefined,
    currency_id: number,
    currency: Currency | undefined
  ) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.termination_date = termination_date;
    this.rent_amount = rent_amount;
    this.contract_url = contract_url;
    this.notes = notes;
    this.unit_id = unit_id;
    this.unit = unit;
    this.tenant_user_id = tenant_user_id;
    this.tenant_user = tenant_user;
    this.currency_id = currency_id;
    this.currency = currency;
  }

  /**
   * Parses a JSON object into a Lease instance.
   * @param json - Input JSON
   * @returns Lease instance
   */
  static fromJSON(json: any): Lease {
    return new Lease(
      json.id,
      json.start_date,
      json.end_date,
      json.termination_date,
      json.rent_amount,
      json.contract_url,
      json.notes,
      json.unit_id,
      json.unit ? Unit.fromJSON(json.unit) : undefined,
      json.tenant_user_id,
      json.tenant_user ? User.fromJSON(json.tenant_user) : undefined,
      json.currency_id,
      json.currency ? Currency.fromJSON(json.currency) : undefined
    );
  }

  /**
   * Converts the Lease instance to a JSON object.
   * @returns JSON-compatible object
   */
  toJSON(): any {
    return {
      id: this.id,
      start_date: this.start_date,
      end_date: this.end_date,
      termination_date: this.termination_date,
      rent_amount: this.rent_amount,
      contract_url: this.contract_url,
      notes: this.notes,
      unit_id: this.unit_id,
      unit: this.unit?.toJSON(),
      tenant_user_id: this.tenant_user_id,
      tenant_user: this.tenant_user?.toJSON(),
      currency_id: this.currency_id,
      currency: this.currency?.toJSON(),
    };
  }
}