# 🍕 Food Delivery — One-Page E-commerce MVP

A full-stack, single-page food delivery site: browse a menu, filter by category,
build a cart that survives a refresh, and place an order against a real REST API.

Written in **plain JavaScript**.

| | |
|---|---|
| **Frontend** | React 18 · Vite · React Bootstrap 5 · SCSS Modules · Redux Toolkit · Axios · React Hook Form · PropTypes |
| **Backend** | Express 4 · MongoDB / Mongoose 8 · express-validator · helmet · express-rate-limit · morgan · JWT |

---

## 📸 Screenshots

> Replace these placeholders with real captures once you have styled to taste.

| Hero | Menu + cart | Order form |
|---|---|---|
| `docs/screenshot-hero.png` | `docs/screenshot-menu.png` | `docs/screenshot-cart.png` |

---

## 🚀 Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB instance (local `mongod`, or a MongoDB Atlas connection string)

### 1. Install

```bash
npm run install:all      # installs both client/ and server/
```

### 2. Configure

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in `server/.env` (see the table below). The client defaults work as-is for
local development.

### 3. Seed the menu

```bash
npm run seed             # wipes and repopulates the menu with 10 dishes
```

### 4. Run

Two terminals:

```bash
npm run server           # http://localhost:5000
npm run client           # http://localhost:5173
```

Vite proxies `/api` to port 5000, so there are no CORS surprises in development.

> **The client works without the API.** If `GET /api/menu` fails, the menu falls
> back to `client/src/data/mockMenu.js` and shows a quiet notice — the page is
> never blank in a portfolio demo.

---

## 🔐 Environment variables

### `server/.env`

| Key | Required | Example | Purpose |
|---|---|---|---|
| `NODE_ENV` | no | `development` | Switches morgan format and stack-trace exposure. |
| `PORT` | no | `5000` | Port the API listens on. Defaults to `5000`. |
| `MONGODB_URI` | **yes** | `mongodb://127.0.0.1:27017/food-delivery` | Mongoose connection string. |
| `CLIENT_URL` | **yes** | `http://localhost:5173` | The single origin allowed by CORS. |
| `API_KEY_ADMIN` | **yes** | `a-long-random-string` | Shared secret for `GET /api/orders`, sent as `x-api-key`. |
| `JWT_SECRET` | **yes** | `another-long-random-string` | Signs the order-lookup token. |
| `JWT_EXPIRES_IN` | no | `2h` | Lifetime of that token. Defaults to `2h`. |

The server refuses to boot if any **required** key is missing — a missing secret
must fail loudly, not silently disable a guard.

### `client/.env`

| Key | Required | Example | Purpose |
|---|---|---|---|
| `VITE_API_BASE_URL` | no | `http://localhost:5000/api` | Axios base URL. Defaults to `/api` (the dev proxy). |
| `VITE_API_TIMEOUT` | no | `10000` | Request timeout in ms. |

Only `VITE_`-prefixed variables reach the browser — and everything that does is
**public**, so never put a secret in `client/.env`.

---

## 📡 API reference

Base URL: `http://localhost:5000/api`

Every response shares one envelope:

```jsonc
// success
{ "success": true, "count": 10, "data": [ /* ... */ ] }

// failure
{ "success": false, "message": "Validation failed.", "errors": [ { "field": "customerName", "message": "Name is required." } ] }
```

### `GET /api/menu`

Returns every **available** menu item, newest first.

<details>
<summary>Response <code>200</code></summary>

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "6aa475f3c572e66f16079660",
      "name": "Margherita Napoletana",
      "description": "San Marzano tomato, fior di latte and fresh basil...",
      "price": 12,
      "category": "pizza",
      "image": "https://images.unsplash.com/photo-1604068549290-...",
      "rating": 4.9,
      "available": true,
      "createdAt": "2026-09-11T21:43:15.213Z",
      "updatedAt": "2026-09-11T21:43:15.213Z"
    }
  ]
}
```

</details>

### `GET /api/menu/:category`

`category` must be one of `burger` · `pizza` · `sushi` · `drinks` · `dessert`.

| Status | When |
|---|---|
| `200` | Valid category — same shape as `GET /api/menu`. |
| `422` | Unknown category. |

### `POST /api/orders`

Places an order. **Rate limited to 10 requests / 15 min.**

<details>
<summary>Request body</summary>

```json
{
  "customerName": "Jane Doe",
  "customerPhone": "+1 555 123 4567",
  "deliveryAddress": "221B Baker Street, London",
  "items": [{ "menuItemId": "6aa475f3c572e66f16079661", "quantity": 2 }],
  "totalPrice": 24.0
}
```

</details>

<details>
<summary>Response <code>201</code></summary>

```json
{
  "success": true,
  "message": "Order placed successfully.",
  "data": {
    "id": "6aa476087a409d1a4e97f2f5",
    "items": [
      { "menuItemId": "...", "name": "Margherita Napoletana", "price": 12, "quantity": 2 }
    ],
    "totalPrice": 24,
    "customerName": "Jane Doe",
    "customerPhone": "+1 555 123 4567",
    "deliveryAddress": "221B Baker Street, London",
    "status": "pending",
    "createdAt": "2026-09-11T21:43:36.312Z",
    "updatedAt": "2026-09-11T21:43:36.312Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

</details>

| Status | When |
|---|---|
| `201` | Order created. |
| `422` | A field failed validation, an item is unavailable, or `totalPrice` disagrees with current menu prices. |
| `429` | More than 10 orders from this IP in 15 minutes. |

> **Prices are never trusted from the client.** The server looks every
> `menuItemId` up, recomputes the total, and rejects the order if the submitted
> `totalPrice` is off by more than a cent.

> **Strings come back HTML-escaped** (an apostrophe arrives as `&#x27;`), because
> validation escapes on the way in. The client decodes them for display via
> `utils/sanitize.js`, using `textContent` — never `innerHTML`.

### `GET /api/orders`

Admin-only listing, newest first. Requires the `x-api-key` header.

```bash
curl http://localhost:5000/api/orders -H "x-api-key: $API_KEY_ADMIN"
```

| Status | When |
|---|---|
| `200` | Valid key. Accepts `?limit=` (default 50, max 100). |
| `401` | Missing or wrong key. |

### `GET /health`

Unauthenticated liveness probe: `{ "success": true, "message": "ok", "uptime": 3.04 }`.

---

## 🔒 Security measures

### Backend

| Measure | Implementation |
|---|---|
| Secure HTTP headers | `helmet()` — HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and more. |
| CORS whitelist | `cors({ origin: CLIENT_URL })` — one origin, not `*`. |
| Global rate limiting | 100 requests / 15 min on everything under `/api`. |
| Write rate limiting | 10 requests / 15 min on `POST /api/orders`. |
| Payload cap | `express.json({ limit: '10kb' })` — an oversized body becomes a `400`, not an OOM. |
| Input validation | `express-validator` rules per route; failures return `422` with a structured `errors[]`. |
| Input sanitisation | Every string is trimmed and escaped before it reaches Mongo. |
| Schema validation | Mongoose enums, `min`/`max`, `maxlength` and regex — a second line of defence. |
| Price tampering | Totals recomputed server-side from the database; mismatches are rejected. |
| Admin auth | `x-api-key` compared with `crypto.timingSafeEqual`, so the key cannot be guessed by timing. Fails **closed** when unconfigured. |
| No stack traces in prod | The central error handler only attaches `stack` when `NODE_ENV !== 'production'`; unexpected errors return a generic message. |
| Secrets via env | Nothing sensitive is hardcoded; the server refuses to boot without its required keys. |
| Graceful shutdown | `SIGTERM`/`SIGINT` drain in-flight requests, close Mongo, then exit — with a 10s forced-exit backstop. |
| Async safety | Every handler is wrapped in `catchAsync`, so no rejection becomes an unhandled crash. |

### Frontend

| Measure | Implementation |
|---|---|
| XSS | React escapes by default; API strings are decoded via `textContent`, never `innerHTML`. |
| localStorage hygiene | Only cart items are persisted, and they are shape-validated on read — stale or hand-edited data cannot crash the store. |
| Quantity bounds | Clamped to 1–99 in the reducer *and* in the UI, matching the server's rules. |
| Config via env | `import.meta.env` only; no hardcoded URLs. |
| Storage failures | Every `localStorage` access is wrapped in `try/catch` for private-browsing and blocked-storage modes. |

---

## 📁 Project structure

```
/client                              ← Vite + React
  /src
    /components
      Navbar/       Navbar.tsx · NavLinks.tsx · CartButton.tsx · useActiveSection.ts
      Hero/         Hero.tsx
      Menu/         Menu.tsx · MenuFilters.tsx · MenuGrid.tsx · MenuState.tsx · CategoryShowcase.tsx
      MenuCard/     MenuCard.tsx
      Cart/         CartSidebar.tsx · CartItem.tsx · OrderForm.tsx
      HowItWorks/   HowItWorks.tsx
      Testimonials/ Testimonials.tsx · TestimonialCard.tsx · testimonialsData.ts
      Footer/       Footer.tsx · FooterLinkList.tsx · Newsletter.tsx · footerLinks.ts
      Auth/         Login.tsx · Sign.tsx · Form/   ← pre-existing pages, not in the one-page flow
      shared/       Btn.tsx · Box.tsx · Download.tsx · SectionHeading.tsx
    /features/cart  cartSlice.js          ← actions + selectors, co-located
    /store          store.js · persistCartMiddleware.js
    /hooks          useMenu.js · useOrder.js · useCart.js
    /services       api.js · menuService.js · orderService.js
    /constants      categories.js · config.js
    /data           mockMenu.js           ← offline fallback
    /styles         _variables.scss · _mixins.scss · globals.scss · pages/*
    /utils          formatPrice.js · localStorage.js · sanitize.js
    App.tsx · main.tsx

/server                              ← Express
  /config      constants.js · database.js
  /models      MenuItem.js · Order.js
  /routes      menu.js · orders.js
  /middleware  errorHandler.js · catchAsync.js · validateRequest.js · adminAuth.js · rateLimiters.js
  /validators  orderValidator.js · menuValidator.js
  /seed        seed.js · menuItems.js
  /utils       logger.js · AppError.js
  app.js · server.js
```

---

## 🎨 Design system

Colors, spacing, radii and breakpoints were extracted from the original
homepage and now live in **`client/src/styles/_variables.scss`** — the single
source of truth. Nothing outside that file hardcodes a color.

| Token | Value | Used for |
|---|---|---|
| `$color-primary` | `#ff5331` | CTAs, prices, accent words in headings |
| `$color-primary-dark` | `#e94339` | Navbar "order now", error text |
| `$color-accent-green` | `#009b00` | Positive accents ("free delivery") |
| `$color-heading` | `#111111` | Section titles |
| `$color-text` | `#191720` | Body copy |
| `$color-ink` | `#090909` | Footer background |
| `$color-surface` | `#fafafa` | Cards |
| `$color-surface-tint` | `#ffefec` | Newsletter band, notices |
| `$radius-md` / `$radius-sm` | `16px` / `10px` | Cards / pills |
| `$radius-pill` | `50rem` | Buttons and inputs |

`_mixins.scss` carries the repeated patterns: `respond-to()`, `flex-center`,
`flex-between`, `card-surface`, `card-shadow`, `button-pill`, `line-clamp`.

Media queries are **mobile-first** and share Bootstrap's breakpoints, so SCSS
and `col-lg-*` classes never disagree.

---

## ✅ What is verified

- `GET /api/menu` and `/api/menu/:category` return seeded data; an unknown category returns `422`.
- `POST /api/orders` creates an order, and rejects a tampered `totalPrice` with `422`.
- The order rate limiter trips at exactly the 11th request.
- `GET /api/orders` returns `401` without a key and `200` with one.
- Stack traces appear in development and are absent in production.
- `SIGTERM` closes the server and the Mongo connection, then exits `0`.
- The client builds clean (204 modules), and the cart reducer passes assertions
  for merging, clamping to 1–99, removal at zero, and cent-accurate totals.

---

## 📄 License

MIT — see [LICENSE](LICENSE). A portfolio project, free to learn from.
