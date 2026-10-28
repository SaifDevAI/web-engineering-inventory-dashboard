# E-Commerce Inventory & Stock Management Dashboard

A modular React application built for a university Web Engineering assignment to demonstrate core React fundamentals, state management, lifecycle methods, hooks, and clean component architecture.

---

## 1. Project Overview & Features

- **Context API Theme Management:** Light and Dark mode toggle powered by `createContext` and `useContext` without prop-drilling.
- **Reusable Container:** `CardWrapper` leveraging `props.children` across functional and class components.
- **Optimized Metrics:** Stock calculations (`Total Products`, `Total Stock`, `Low Stock`, `Out of Stock`) computed using `useMemo`.
- **Product Entry Form:** Controlled form using `useState` and `useRef` for auto-focusing on mount and post-submission.
- **Filtering & List Catalog:** Dynamic category and stock status filtering with `useMemo` and conditional rendering for empty states.
- **Product Cards:** Real-time stock increments, decrements with bounds, deletion, and conditional status badges (`In Stock`, `Low Stock`, `Out of Stock`).
- **Class Component & Full Lifecycle Demo:** `AuditLogger` component explicitly using `this.state`, `this.setState()`, `componentDidMount()`, `componentDidUpdate()`, and `componentWillUnmount()`.
- **Main App State & Stability:** Persistent local storage synchronization with `useEffect`, dynamic `document.title`, and handler memoization with `useCallback`.

---

## 2. Directory Structure

```text
src/
├── components/
│   ├── class/
│   │   └── AuditLogger.jsx
│   └── functional/
│       ├── Header.jsx
│       ├── InventoryMetrics.jsx
│       ├── ProductForm.jsx
│       ├── ProductList.jsx
│       ├── ProductCard.jsx
│       └── CardWrapper.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## 3. Setup and Installation Instructions

Follow these steps to run the application locally:

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd web-engineering-inventory-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open the displayed URL (usually `http://localhost:5173`) in your web browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 4. Theoretical Analysis: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

Client-Side Rendering (CSR), as implemented in this Vite and React Single-Page Application (SPA), shifts the rendering workload entirely to the user's browser. On the initial request, the server returns an empty HTML skeleton alongside bundled JavaScript. The browser downloads, parses, and executes this bundle, queries APIs for data, and mounts the DOM client-side. In contrast, Server-Side Rendering (SSR), prominent in frameworks like Next.js, executes React components on a Node.js server upon each request. The server renders components into fully populated HTML before transmitting it to the client, after which client-side hydration attaches event listeners.

The architectural differences between CSR and SSR present distinct trade-offs across performance, search engine optimization (SEO), and infrastructure cost:

1. **Initial Page Load & Performance:** CSR experiences a slower First Contentful Paint (FCP) and Time to Interactive (TTI) on cold visits due to substantial JavaScript payload downloads. However, subsequent route transitions are instantaneous because only data is fetched. SSR delivers rapid initial content delivery and superior Core Web Vitals, but requires round-trips to the server for dynamic pages, potentially increasing Time to First Byte (TTFB).

2. **Search Engine Optimization (SEO):** SSR excels for public-facing storefronts where search crawlers require immediate, pre-rendered semantic HTML to index product metadata reliably. While modern crawlers execute JavaScript, CSR remains vulnerable to delayed or incomplete indexing.

3. **Hosting & Operational Complexity:** CSR applications are static assets deployable globally across economical Content Delivery Networks (CDNs) or Object Storage with near-infinite scalability. Conversely, SSR necessitates dedicated Node.js servers or serverless runtime infrastructure, elevating operational complexity, monitoring requirements, and compute expenditures.

For an enterprise internal inventory dashboard behind authentication, CSR is optimal: SEO is irrelevant, CDN hosting is cost-effective, and instantaneous client-side interactivity excels for data-heavy administrative workflows.
