# TypeScript Migration Progress

Workflow: rename/edit a file to `.ts`/`.tsx`, then ask Claude to "check it" —
it reads the file, runs `npx tsc --noEmit -p tsconfig.json` (from `client/`),
fixes any issues, and re-verifies before moving to the next file.

## Done

- Pure data/constants: `categories.ts`, `config.ts` (+ `vite-env.d.ts` created
  for `import.meta.env` typing), `mockMenu.ts`, `footerLinks.ts`,
  `testimonialsData.ts`
- Services: `api.ts` (added `UnwrappedAxiosInstance` type since the response
  interceptor unwraps `response.data`, but axios's own types don't know
  that), `menuService.ts`, `orderService.ts`
- Hooks: `hooks.ts`, `useCart.ts`, `useMenu.ts`, `useOrder.ts`,
  `useActiveSection.ts`

## Remaining

### Shared/presentational components
- [ ] `components/shared/Box.jsx`
- [ ] `components/shared/Btn.jsx`
- [ ] `components/shared/Download.jsx`
- [ ] `components/shared/SectionHeading.jsx`
- [ ] `components/MenuCard/MenuCardSkeleton.jsx`
- [ ] `components/MenuCard/MenuCard.jsx`
- [ ] `components/Testimonials/TestimonialCard.jsx`
- [ ] `components/Footer/FooterLinkList.jsx`
- [ ] `components/Footer/Newsletter.jsx`
- [ ] `components/Navbar/NavLinks.jsx`
- [ ] `components/Navbar/CartButton.jsx`

### Cart components
- [ ] `components/Cart/CartSidebar.jsx`
- [ ] `components/Cart/OrderForm.jsx`

### Section/feature components
- [ ] `components/Hero/Hero.jsx`
- [ ] `components/HowItWorks/HowItWorks.jsx`
- [ ] `components/Menu/CategoryShowcase.jsx`
- [ ] `components/Menu/MenuFilters.jsx`
- [ ] `components/Menu/MenuGrid.jsx`
- [ ] `components/Menu/MenuState.jsx`
- [ ] `components/Menu/Menu.jsx`
- [ ] `components/Testimonials/Testimonials.jsx`
- [ ] `components/Footer/Footer.jsx`
- [ ] `components/Navbar/Navbar.jsx`

### Top level
- [ ] `App.jsx`
- [ ] `main.jsx`

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
- Pre-existing, unrelated `tsc` errors exist in `cartSlice.js`/`.ts`,
  `store.ts`/`store.js`, and `localStorage.ts`/`.js` — not yet in scope,
  flagged but not fixed.
