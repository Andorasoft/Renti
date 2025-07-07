// place files you want to import through the `$lib` alias in this folder.
import authRepository from "./repository/authRepository";
import countryRepository from "./repository/countryRepository";
import userProfileRepository from "./repository/userProfileRepository";
import userRoleRepository from "./repository/userRoleRepository";

export { default as router } from "./router";
export { default as supabase } from "./supabase";

export const repository = {
  auth: authRepository,
  userRole: userRoleRepository,
  userProfile: userProfileRepository,
  country: countryRepository
};
