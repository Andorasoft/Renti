import AppUser from './AppUser';
import Currency from './Currency';
import Unit from './Unit';

/**
 * Represents a lease contract between a tenant and a rental unit.
 */
export default class Lease {
  /**
   * Unique identifier of the lease.
   */
  public id: number;

  /**
   * Timestamp when the lease was created.
   */
  public created_at: string;

  /**
   * Lease start date.
   */
  public start_date: string;

  /**
   * Lease end date (planned).
   */
  public end_date: string;

  /**
   * Optional termination date (if the lease ended early).
   */
  public termination_date: string | null;

  /**
   * Monthly rent amount agreed in the lease.
   */
  public rent_amount: number;

  /**
   * Optional URL or reference to the contract document.
   */
  public contract_url: string | null;

  /**
   * Additional notes or clauses about the lease.
   */
  public notes: string | null;

  /**
   * Foreign key to the rented unit.
   */
  public unit_id: number;

  /**
   * Foreign key to the tenant user.
   */
  public tenant_user_id: number;

  /**
   * Foreign key to the currency used for payment.
   */
  public currency_id: number;

  /**
   * Optional reference to the unit object.
   */
  public unit?: Unit;

  /**
   * Optional reference to the tenant user object.
   */
  public tenant_user?: AppUser;

  /**
   * Optional reference to the currency object.
   */
  public currency?: Currency;

  constructor(
    id: number,
    created_at: string,
    start_date: string,
    end_date: string,
    termination_date: string | null,
    rent_amount: number,
    contract_url: string | null,
    notes: string | null,
    unit_id: number,
    tenant_user_id: number,
    currency_id: number,
    unit?: Unit,
    tenant_user?: AppUser,
    currency?: Currency
  ) {
    this.id = id;
    this.created_at = created_at;
    this.start_date = start_date;
    this.end_date = end_date;
    this.termination_date = termination_date;
    this.rent_amount = rent_amount;
    this.contract_url = contract_url;
    this.notes = notes;
    this.unit_id = unit_id;
    this.tenant_user_id = tenant_user_id;
    this.currency_id = currency_id;
    this.unit = unit;
    this.tenant_user = tenant_user;
    this.currency = currency;
  }

  /**
   * Creates a Lease instance from a plain JSON object.
   * @param obj JSON object
   * @returns Lease instance
   */
  static fromJSON(obj: any): Lease {
    return new Lease(
      obj.id,
      obj.created_at,
      obj.start_date,
      obj.end_date,
      obj.termination_date ?? null,
      Number(obj.rent_amount),
      obj.contract_url ?? null,
      obj.notes ?? null,
      obj.unit_id,
      obj.tenant_user_id,
      obj.currency_id,
      obj.unit ? Unit.fromJSON(obj.unit) : undefined,
      obj.tenant_user ? AppUser.fromJSON(obj.tenant_user) : undefined,
      obj.currency ? Currency.fromJSON(obj.currency) : undefined
    );
  }

  /**
   * Converts the Lease instance into a JSON object.
   * @returns JSON representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      start_date: this.start_date,
      end_date: this.end_date,
      termination_date: this.termination_date,
      rent_amount: this.rent_amount,
      contract_url: this.contract_url,
      notes: this.notes,
      unit_id: this.unit_id,
      tenant_user_id: this.tenant_user_id,
      currency_id: this.currency_id,
      unit: this.unit,
      tenant_user: this.tenant_user,
      currency: this.currency
    };
  }
}
