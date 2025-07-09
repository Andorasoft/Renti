export const router = [
  {
    name: "auth",
    path: "/auth",
    protected: false,
    queryParams: {
      action: ["sign-in", "sign-up"]
    }
  },
  {
    name: "password-reset",
    path: "/auth/password_reset",
    protected: false,
    queryParams: {
      type: ["recovery", ""] // expected from Supabase magic link
    }
  },
  {
    name: "home",
    path: "/",
    protected: true,
    queryParams: {}
  },
  {
    name: "on-boarding",
    path: "/onboarding",
    protected: true,
    queryParams: {}
  },
  {
    name: "profile",
    path: "/profile",
    protected: true,
    queryParams: {}
  }
];