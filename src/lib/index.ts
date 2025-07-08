// place files you want to import through the `$lib` alias in this folder.
import authRepository from "./repository/authRepository";
import countryRepository from "./repository/countryRepository";
import userProfileRepository from "./repository/userProfileRepository";
import userRoleRepository from "./repository/userRoleRepository";

export { default as DatePicker } from "./components/DatePicker.svelte";
export { default as Loader } from "./components/Loader.svelte";
export { default as PhoneBox } from "./components/PhoneBox.svelte";
export { default as PasswordResetForm } from "./components/PasswordResetForm.svelte";
export { default as PasswordChangeForm } from "./components/PasswordChangeForm.svelte";
export { default as SearchBox } from "./components/SearchBox.svelte";
export { default as SignInForm } from "./components/SignInForm.svelte";
export { default as SignUpForm } from "./components/SignUpForm.svelte";
export { default as TextBox } from "./components/TextBox.svelte";

export type { CircleSpinner } from "./types/CircleSpinner";
export type { Spinner } from "./types/Spinner";

export { default as Building } from "./models/Building";
export { default as Country } from "./models/Country";
export { default as Currency } from "./models/Currency";
export { default as User } from "./models/User";
export { default as UserProfile } from "./models/UserProfile";
export { default as UserRole } from "./models/UserRole";

/**
 * 
 */
export const repository = {
  /**
   * 
   */
  auth: authRepository,
  /**
   * 
   */
  userRole: userRoleRepository,
  /**
   * 
   */
  userProfile: userProfileRepository,
  /**
   * 
   */
  country: countryRepository
};