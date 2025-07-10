// place files you want to import through the `$lib` alias in this folder.
import appUserRepository from "./repository/appUserRepository";
import authRepository from "./repository/authRepository";
import buildingRepository from "./repository/buildingRepository";
import cityRepository from "./repository/cityRepository";
import countryRepository from "./repository/countryRepository";
import currencyRepository from "./repository/currencyRepository";
import leaseRepository from "./repository/leaseRepository";
import stateRepository from "./repository/stateRepository";
import stateTypeRepository from "./repository/stateTypeRepository";
import unitRepository from "./repository/unitRepository";
import userRoleRepository from "./repository/userRoleRepository";

/* Commons components */
export { default as InputCheckbox } from './components/commons/InputCheckbox.svelte';
export { default as InputFile } from './components/commons/InputFile.svelte';
export { default as InputPhone } from './components/commons/InputPhone.svelte';
export { default as InputSearch } from './components/commons/InputSearch.svelte';
export { default as InputText } from './components/commons/InputText.svelte';

/* Forms components */
export { default as FormPasswordReset } from './components/forms/FormPasswordReset.svelte';
export { default as FormPasswordUpdate } from './components/forms/FormPasswordUpdate.svelte';
export { default as FormSignIn } from './components/forms/FormSignIn.svelte';
export { default as FormSignUp } from './components/forms/FormSignUp.svelte';

export { default as DatePicker } from "./components/DatePicker.svelte";
export { default as Loader } from "./components/Loader.svelte";
export { default as PhoneBox } from "./components/PhoneBox.svelte";
export { default as SearchBox } from "./components/SearchBox.svelte";

export type { CircleSpinner } from "./types/CircleSpinner";
export type { QueryError } from "./types/QueryError";
export type { Spinner } from "./types/Spinner";

export { default as AppUser } from "./models/AppUser";
export { default as Building } from "./models/Building";
export { default as City } from "./models/City";
export { default as Country } from "./models/Country";
export { default as Currency } from "./models/Currency";
export { default as Lease } from "./models/Lease";
export { default as State } from "./models/State";
export { default as StateType } from "./models/StateType";
export { default as Unit } from "./models/Unit";
export { default as UserRole } from "./models/UserRole";

/**
 * Centralized repository object that aggregates all domain-specific repositories.
 * This object allows uniform access to data operations for each table in the system,
 * improving maintainability and consistency across the application.
 *
 * Each property is a repository module corresponding to a specific database table,
 * and contains fully documented methods such as `getAll()` and `getById()` for
 * standard read operations.
 */
export const repository = {
  /**
   * Repository for handling authenticated user actions such as login and session verification.
   * Contains logic for managing access control and credential-based workflows.
   */
  auth: authRepository,

  /**
   * Repository for CRUD operations on the `app_user` table.
   * Manages both tenants and owners, including their profile data and roles.
   */
  appUser: appUserRepository,

  /**
   * Repository for the `building` table.
   * Handles data about properties, including address, images, owner info, and location.
   */
  building: buildingRepository,

  /**
   * Repository for the `city` table.
   * Provides access to localities, including links to their corresponding state.
   */
  city: cityRepository,

  /**
   * Repository for the `country` table.
   * Manages country-level data, ISO codes, and associated currencies.
   */
  country: countryRepository,

  /**
   * Repository for the `currency` table.
   * Used to manage monetary definitions including symbols and codes.
   */
  currency: currencyRepository,

  /**
   * Repository for the `lease` table.
   * Handles rental contracts, periods, amounts, tenants, and units involved.
   */
  lease: leaseRepository,

  /**
   * Repository for the `state` table.
   * Provides access to sub-national divisions such as provinces or regions.
   */
  state: stateRepository,

  /**
   * Repository for the `state_type` table.
   * Defines classifications for states such as "Province", "State", or "Region".
   */
  stateType: stateTypeRepository,

  /**
   * Repository for the `unit` table.
   * Manages individual rental spaces within a building, including tenant assignment.
   */
  unit: unitRepository,

  /**
   * Repository for the `user_role` table.
   * Stores predefined roles used for permission management (e.g., admin, tenant, owner).
   */
  userRole: userRoleRepository
};
