---
title: Routing & data fetching
sidebar_position: 3
description: React Router basics, protected routes, fetching with loading and error states, TanStack Query, environment variables and calling a Spring Boot API.
---

## React Router

```bash
npm i react-router
```

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate, Outlet } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route element={<RequireAuth />}>
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
      </nav>
      <main><Outlet /></main>      {/* child route renders here */}
    </>
  );
}

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // navigate("/products") or navigate(-1)
}
```

### Protected route

```jsx
function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
```

Query string: `const [params, setParams] = useSearchParams(); params.get("page")`.

:::note Deploying an SPA
Static hosts must send every unknown path to `index.html`, otherwise refreshing `/products/7` gives 404. On Vercel this is automatic for Vite; on Netlify add `/* /index.html 200` to `_redirects`.
:::

## Fetching by hand

```jsx
function Products() {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    let ignore = false;
    api.get("/products")
      .then(data => !ignore && setState({ status: "done", data, error: null }))
      .catch(error => !ignore && setState({ status: "error", data: null, error }));
    return () => { ignore = true; };          // avoid setting state for an old request
  }, []);

  if (state.status === "loading") return <Spinner />;
  if (state.status === "error") return <ErrorBox error={state.error} />;
  return <ProductGrid items={state.data} />;
}
```

## TanStack Query (recommended)

Caching, de-duplication, retries, background refetch and pagination for free.

```jsx
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>

function Products() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => api.get(`/products?page=${page}`),
    staleTime: 60_000,
  });
}

function AddProduct() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: body => api.post("/products", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
  return <button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}>Save</button>;
}
```

## A tiny API client

```js
const BASE = import.meta.env.VITE_API_URL;      // Vite exposes only VITE_* vars

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const problem = await res.json().catch(() => ({}));
    throw new Error(problem.detail ?? `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  get: p => request(p),
  post: (p, body) => request(p, { method: "POST", body }),
  del: p => request(p, { method: "DELETE" }),
};
```

:::warning
Anything in a front-end `.env` ends up in the browser bundle — never put secrets there.
:::

## Talking to Spring Boot locally

Either enable CORS on the API…

```java
@Bean
WebMvcConfigurer cors() {
  return new WebMvcConfigurer() {
    public void addCorsMappings(CorsRegistry r) {
      r.addMapping("/api/**").allowedOrigins("http://localhost:5173").allowedMethods("*");
    }
  };
}
```

…or proxy through Vite so the browser sees one origin:

```js
// vite.config.js
export default { server: { proxy: { "/api": "http://localhost:8080" } } };
```
