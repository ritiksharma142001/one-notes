---
title: Hooks
sidebar_position: 2
description: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer and writing custom hooks — with the rules and common mistakes.
---

## Rules of hooks

1. Call hooks only at the **top level** of a component or custom hook — never inside `if`, loops or nested functions.
2. Call them only from **React functions** (components or hooks starting with `use`).

React identifies each hook by its call order, so the order must be the same on every render.

## useState

```jsx
const [items, setItems] = useState([]);
const [filters, setFilters] = useState(() => JSON.parse(localStorage.getItem("f") ?? "{}"));  // lazy init
```

## useEffect

Synchronise a component with something **outside React** (network, DOM APIs, timers, subscriptions).

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/users/${id}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(e => { if (e.name !== "AbortError") setError(e); });

  return () => controller.abort();   // cleanup: runs before the next effect and on unmount
}, [id]);                            // re-run only when id changes
```

| Dependency array | Runs |
|---|---|
| omitted | after **every** render |
| `[]` | once after mount (twice in dev Strict Mode — on purpose) |
| `[a, b]` | when `a` or `b` change |

:::warning You might not need an effect
- **Derived data** → compute it during render: `const total = items.reduce(...)`.
- **Responding to a click** → do it in the event handler.
- **Resetting state when a prop changes** → give the component a `key`.
:::

## useRef

A box that survives re-renders **without** causing one.

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>

const timer = useRef();               // store mutable values (interval ids, previous value)
timer.current = setInterval(tick, 1000);
```

## useMemo & useCallback

Cache work between renders — use them when you have measured a slowdown or need a stable reference.

```jsx
const visible = useMemo(
  () => todos.filter(t => t.text.includes(query)),   // expensive calculation
  [todos, query]
);

const onDelete = useCallback(id => setTodos(t => t.filter(x => x.id !== id)), []);
// stable function → a React.memo child won't re-render needlessly
```

`useCallback(fn, deps)` is the same as `useMemo(() => fn, deps)`. The **React Compiler** can add this memoisation automatically.

## useContext

Pass data deep without prop-drilling (theme, logged-in user, locale).

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, login: setUser, logout: () => setUser(null) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

// anywhere below
const { user, logout } = useAuth();
```

Every consumer re-renders when the value changes — split contexts or use a store (Zustand, Redux Toolkit) for fast-changing global state.

## useReducer

For state with many related transitions.

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case "add":    return [...state, action.item];
    case "remove": return state.filter(i => i.id !== action.id);
    case "clear":  return [];
    default:       throw new Error(`Unknown action ${action.type}`);
  }
}

const [cart, dispatch] = useReducer(cartReducer, []);
dispatch({ type: "add", item });
```

## Custom hooks

Extract reusable stateful logic. A custom hook is just a function whose name starts with `use`.

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function useDebounce(value, ms = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}
```

## Other hooks worth knowing

| Hook | Use for |
|---|---|
| `useId` | unique ids for `htmlFor` / aria attributes |
| `useTransition` | mark a slow update as non-urgent; keep typing responsive |
| `useDeferredValue` | show stale results while new ones render |
| `useLayoutEffect` | measure the DOM before paint (rare) |
| `useActionState`, `useOptimistic` | React 19 form actions and optimistic UI |
| `use` | read a promise or context (React 19) |

## Common mistakes

- **Stale closure:** an interval reads an old `count` → use `setCount(c => c + 1)`.
- **Object/array in deps** created during render → the effect runs every time; memoise or depend on primitives.
- **Infinite loop:** an effect sets state that is also in its own dependency list.
- **Missing cleanup:** listeners/intervals pile up after navigation.
