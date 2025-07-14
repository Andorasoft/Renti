# 🏘️ Renti – LATAM Rental Management Platform

**Renti** is a property management platform tailored for the Latin American market. It enables landlords and tenants to manage rental units, generate lease contracts, handle maintenance requests, and more — all from a simple and accessible interface.

> 🚧 Currently under development. Initial release will focus on Ecuador.

---

## 📌 Project Goals

- Offer a complete digital experience for long-term rentals in LATAM.
- Prioritize usability for both tech-savvy users and older landlords.
- Provide a minimal, fast, and privacy-conscious solution.

---

## ✨ MVP Features

- [x] Email/Google/Facebook authentication
- [x] User profile creation and onboarding
- [x] Invite tenants via unique inquilino code
- [x] Property and unit management (buildings, apartments)
- [x] AI-generated lease agreements
- [x] Maintenance request system (ticketing)
- [x] Ecuador-only support (for now)

---

## 📈 Roadmap

### 🚀 Phase 1: MVP (Ecuador)
- Auth & onboarding ✔️
- Property & tenant modules ✔️
- Contract generation ✔️
- Maintenance system ✔️

### 🧾 Phase 2: Compliance & Local Integration
- Electronic invoicing (SRI Ecuador)
- National ID (CI) autocomplete via government API

### 💳 Phase 3: Payments
- Stripe for credit/debit cards
- [DeUna](https://deuna.com.ec/) integration for bank transfers (Ecuador)

### 🏠 Phase 4: Marketplace
- Rental search for long-term stays
- Listings separate from tourist-style platforms like Airbnb

---

## 🛠 Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| Frontend     | SvelteKit / Vue (modular)    |
| Backend      | Supabase (PostgreSQL, Auth, Realtime) |
| Contracts AI | (Pluggable) Text generation pipeline |
| Payments     | Stripe (global), DeUna (local) |
| Hosting      | Vercel / Netlify / GitHub Pages |
| Domain       | [renti.la](https://renti.la) |

---

## 🧑‍💻 Development Notes

- No multitenancy for MVP – single-tenant architecture
- Designed for simplicity, performance, and maintainability
- Clean separation between logic, components, and repository layers
- Forms enhanced via `use:enhance` and server actions (`+page.server.ts`)

---

## 🔌 Planned Integrations

- 🇪🇨 SRI (Ecuador’s tax authority) – electronic invoicing
- Civil Registry – ID-based data prefill
- Stripe – international payment support
- DeUna – local payment API (Banco Pichincha)

---

## 🎯 Target Users

- Individual landlords (often middle-aged or older)
- Long-term tenants
- Initially limited to Ecuador

---

## 📂 Repository Structure

```
/src
  /lib
    /components   # UI Components
    /models       # Types and interfaces
    /repositories # Database access layer
    /utils        # Helpers and shared logic
/routes
  /auth
  /onboarding
  /dashboard
  ...
```

---

## 🧪 Status

> MVP in progress – expected to open for early testing soon.

Want to collaborate or test early? Reach out via [renti.la](https://renti.la) (coming soon).
