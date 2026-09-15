# TypeScript Migration Progress

Workflow: rename/edit a file to `.ts`/`.tsx`, then ask Claude to "check it" —
it reads the file, runs `npx tsc --noEmit -p tsconfig.json` (from `client/`),
fixes any issues, and re-verifies before moving to the next file.

## Done

Migration complete — every `.jsx`/`.js` component, hook, and service under
`client/src` is now `.tsx`/`.ts`.

- Pure data/constants: `categories.ts`, `config.ts` (+ `vite-env.d.ts` created
  for `import.meta.env` typing), `mockMenu.ts`, `footerLinks.ts`,
  `testimonialsData.ts`
- Services: `api.ts` (added `UnwrappedAxiosInstance` type since the response
  interceptor unwraps `response.data`, but axios's own types don't know
  that), `menuService.ts`, `orderService.ts`
- Hooks: `hooks.ts`, `useCart.ts`, `useMenu.ts`, `useOrder.ts`,
  `useActiveSection.ts`
- Shared/presentational: `Box.tsx`, `Btn.tsx` (both had gone stale — unused
  `React` imports, a `styles.xxx` module-CSS lookup left over from before
  they switched to plain global `_box.scss`/`_btn.scss`, and `BtnProps`
  missing half its fields — all fixed), `Download.tsx`, `SectionHeading.tsx`,
  `MenuCard/MenuCardSkeleton.tsx`, `MenuCard/MenuCard.tsx`,
  `Testimonials/TestimonialCard.tsx`, `Footer/FooterLinkList.tsx`,
  `Footer/Newsletter.tsx`, `Navbar/NavLinks.tsx`, `Navbar/CartButton.tsx`
- Cart components: `Cart/CartSidebar.tsx`, `Cart/OrderForm.tsx`
- Section/feature components: `Hero/Hero.tsx`, `HowItWorks/HowItWorks.tsx`,
  `Menu/CategoryShowcase.tsx`, `Menu/MenuFilters.tsx`, `Menu/MenuGrid.tsx`,
  `Menu/MenuState.tsx`, `Menu/Menu.tsx`, `Testimonials/Testimonials.tsx`,
  `Footer/Footer.tsx`, `Navbar/Navbar.tsx`
- Top level: `App.tsx`, `main.tsx`

## Notes / gotchas hit so far

- `import.meta.env` needed `client/src/vite-env.d.ts` (tsconfig had no
  `"types": ["vite/client"]` entry).
- `api.ts`'s response interceptor returns `response.data`, not the full
  `AxiosResponse` — axios's declared types don't reflect this, so a custom
  `UnwrappedAxiosInstance` type was added to make `.get<T>()`/`.post<T>()`
  actually return `T`. Any new service functions should rely on that, not
  reach for `.data` on the result.
- Object literals used as initial `useState` values (e.g. an `IDLE` state
  object) need an explicit type annotation, otherwise TS narrows fields like
  `null` or `[]` to their literal type instead of the intended union.
- `.filter(Boolean)` does not narrow `T | null` arrays for TypeScript — use
  an explicit type predicate: `.filter((x): x is T => x !== null)`.
- `orderService.ts`'s `CreateOrderResult.order` was typed as `MenuItem[]`,
  but `POST /api/orders` actually returns a single order object (mongoose's
  `order.toJSON()`, with an `id`, `items`, `totalPrice`, etc. — see
  `server/routes/orders.js` and `server/models/Order.js`). This only
  surfaced once `CartSidebar.tsx` tried to read `order.id`. Added a proper
  `Order`/`OrderItem` type to `store/types.ts` and pointed `orderService.ts`
  and `useOrder.ts` at it instead.
- `components/Cart/CartItem.tsx`'s local `ItemProps.id` was typed `number`;
  every other id in the app (`MenuItem.id`, the cart slice, `useCart`'s
  `CartItem`) is a `string`. Fixed to `string` — it would have mismatched
  the moment `CartSidebar.tsx` wired real cart items into it.
- `readonly` tuples/arrays from `as const` data (e.g. `NAV_LINKS`) don't
  satisfy a plain mutable array prop type — component prop interfaces that
  accept this kind of data (e.g. `NavLinksProps.links`) need `readonly T[]`.
- Native DOM generics: `document.getElementById` is not generic — don't
  write `getElementById<T>(id)`; use `getElementById(id)!` or a null guard.
  `ReactDOM.createRoot` also does not accept `HTMLElement | null`.
- Pre-existing, unrelated `tsc` errors remain in `cartSlice.ts`, `store.ts`,
  and `localStorage.ts` — flagged but intentionally left out of scope (same
  as before this pass).
- A `vite build` currently fails on an unrelated Sass issue (`Undefined
  variable $navbar-height` in `_globals.scss`) — confirmed pre-existing
  (reproduces on a clean stash of this branch), not caused by the TS
  migration.
