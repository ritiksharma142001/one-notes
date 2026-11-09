---
title: Performance & patterns
sidebar_position: 4
description: Why components re-render, React.memo, code splitting, list virtualisation, folder structure, testing and accessibility checklists.
---

## Why does a component re-render?

1. Its **state** changed.
2. Its **parent** re-rendered (props don't need to change!).
3. A **context** it reads changed.

Re-rendering is usually cheap. Optimise only after measuring with the **React DevTools Profiler** ("Highlight updates when components render").

## Tools

```jsx
const Row = memo(function Row({ item, onSelect }) { ... });   // skip render if props are equal (shallow)

const onSelect = useCallback(id => setSelected(id), []);      // keep the prop stable for memo
const sorted = useMemo(() => sortBy(items, key), [items, key]);
```

Cheaper wins first:
- **Move state down** — keep state in the smallest component that needs it.
- **Pass children** — `<Layout><ExpensiveTree /></Layout>`: the children element is created by the parent, so state changes inside `Layout` don't re-render it.
- **Avoid creating components inside components** — they remount every render and lose state.

## Code splitting

```jsx
const Admin = lazy(() => import("./Admin"));

<Suspense fallback={<Spinner />}>
  <Admin />
</Suspense>
```

Split by route; load heavy libraries (charts, editors, PDF) only where they're used.

## Long lists

Rendering 10,000 rows is slow — render only what's visible with **TanStack Virtual** or `react-window`. Paginate or "load more" on the server side when you can.

## Images & bundle

- Give images `width`/`height` (no layout shift) and `loading="lazy"` below the fold.
- Serve WebP/AVIF; Next.js `<Image>` does it for you.
- Inspect the bundle: `npx vite-bundle-visualizer`.

## Folder structure that scales

```
src/
├── app/            # providers, router, App.tsx
├── features/
│   ├── auth/       # LoginForm.tsx, useAuth.ts, api.ts
│   └── products/   # ProductList.tsx, ProductCard.tsx, queries.ts
├── components/     # shared UI: Button, Modal, Spinner
├── hooks/          # shared hooks
└── lib/            # api client, utils
```

## Testing

```jsx
// Vitest + React Testing Library
test("adds a todo", async () => {
  render(<Todos />);
  await userEvent.type(screen.getByRole("textbox", { name: /new todo/i }), "Buy milk");
  await userEvent.click(screen.getByRole("button", { name: /add/i }));
  expect(screen.getByText("Buy milk")).toBeInTheDocument();
});
```

Test what the user sees (roles, labels, text) — not internal state. Mock the network with **MSW**.

## Accessibility checklist

- Use real elements: `<button>` for actions, `<a href>` for navigation.
- Every input has a `<label>`; every image has `alt` (empty `alt=""` if decorative).
- Visible focus styles; everything works with the keyboard.
- Dialogs trap focus and close on `Esc` (use `<dialog>` or Radix/Headless UI).
- Check colour contrast and run Lighthouse / axe.

## Patterns cheat sheet

| Pattern | Use it when |
|---|---|
| Container / presentational | separate data loading from markup |
| Compound components (`<Tabs><Tabs.List/>…`) | flexible, related components sharing state |
| Custom hook | share stateful logic |
| Context + reducer | app-wide state with clear actions |
| Error boundary | catch render errors in a subtree and show a fallback |
