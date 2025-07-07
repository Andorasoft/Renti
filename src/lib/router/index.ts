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
    params: ["sign-in", "sign-up", "password-reset"]
  }
];