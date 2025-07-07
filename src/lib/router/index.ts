export const router = [
  {
    name: "home",
    path: "/",
    protected: true
  },
  {
    name: "auth",
    path: "/auth",
    protected: false
  },
  {
    name: "signIn",
    path: "/sign-in",
    protected: false
  },
  {
    name: "signUp",
    path: "/sign-up",
    protected: false
  },
  {
    name: "passwordReset",
    path: "/password-reset",
    protected: false
  }
];