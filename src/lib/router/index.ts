export const router = [
  {
    name: "home",
    path: "/",
    protected: true,
    params: []
  },
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
  }
];