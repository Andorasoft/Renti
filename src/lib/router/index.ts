const router = [
  {
    path: "/",
    protected: true
  },
  {
    path: "/login",
    protected: false
  },
  {
    paht: "/password-reset",
    protected: false
  }
];

export default router;