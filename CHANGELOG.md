# Changelog

All notable changes, architectural implementations, and refinements for the **E-Commerce Inventory & Stock Management Dashboard** are documented in this file.

---

## [1.0.0] - 2026-10-28

### Architecture & Feature Implementations
- **Context API Theming (`src/context/ThemeContext.jsx`):**
  - Created `ThemeContext` and `ThemeProvider` to manage `light` and `dark` themes globally.
  - Implemented persistent theme storage via `localStorage`.
  - Added `toggleTheme` function consumed by the header toggle button.

- **Reusable Wrapper Component (`src/components/functional/CardWrapper.jsx`):**
  - Built a container component utilizing React Children (`props.children`).
  - Added optional `title` rendering and theme-adaptive border and background styling.
  - Wrapped around `ProductForm`, `InventoryMetrics`, `ProductCard`, and `AuditLogger`.

- **Dashboard Header (`src/components/functional/Header.jsx`):**
  - Created a responsive header containing the dashboard title.
  - Consumed `ThemeContext` via `useContext` to toggle between Light and Dark mode.

- **Inventory Metrics Component (`src/components/functional/InventoryMetrics.jsx`):**
  - Displayed metric cards for `Total Products`, `Total Stock Quantity`, `Low Stock Items (<= 5)`, and `Out of Stock Items (=== 0)`.
  - Optimized calculations using `useMemo` to eliminate unnecessary recomputations.

- **Product Entry Form (`src/components/functional/ProductForm.jsx`):**
  - Implemented controlled inputs for Product Title, Category (Electronics, Clothing, Grocery), Price, and Stock Quantity.
  - Attached a `useRef` hook (`titleInputRef`) to auto-focus the title input upon component mount (`useEffect`) and immediately after form submission.
  - Added form validation and reset logic before invoking `onAddProduct`.

- **Product Card Component (`src/components/functional/ProductCard.jsx`):**
  - Displayed product metadata (Name, Category, Price, Stock).
  - Implemented conditional rendering for status badges:
    - Red badge: `"Out of Stock"` (stock = 0)
    - Orange badge: `"Low Stock"` (stock between 1 and 5)
    - Green badge: `"In Stock"` (stock > 5)
  - Added stock increment (`+1`), bound stock decrement (`-1`, disabled at 0), and item deletion handlers.

- **Product Catalog & Filtering (`src/components/functional/ProductList.jsx`):**
  - Added category filter (`All`, `Electronics`, `Clothing`, `Grocery`) and stock status filter (`All`, `In Stock`, `Low Stock`, `Out of Stock`).
  - Memoized filtered inventory using `useMemo`.
  - Implemented conditional empty-state rendering when no items match filters.
  - Rendered card lists using `Array.prototype.map()` with unique `key` props.

- **Class Component & Full Lifecycle Demo (`src/components/class/AuditLogger.jsx`):**
  - Built a React Class Component extending `React.Component` explicitly using `this.state` and `this.setState()`.
  - **`componentDidMount()`:** Loaded previously persisted logs from `localStorage`.
  - **`componentDidUpdate()`:** Detected prop updates (`latestAction`), prepended new logs, persisted to `localStorage`, and triggered a 3-second auto-clearing notification.
  - **`componentWillUnmount()`:** Cleared active notification timeouts (`clearTimeout`) to prevent memory leaks when toggled off.
  - Included a `"Clear Logs"` action to purge state and stored data.

- **Custom Hook (`src/hooks/useLocalStorage.js`):**
  - Provided a modular, reusable hook for synchronizing state with browser `localStorage`.

- **Main Application Coordinator (`src/App.jsx`):**
  - Initialized inventory state with fallback sample items and local storage persistence.
  - Wrapped handlers (`handleAddProduct`, `handleUpdateStock`, `handleDeleteProduct`) with `useCallback` for stable function references.
  - Added `useEffect` hooks to synchronize state to `localStorage` and dynamically update `document.title = "Inventory (X items)"`.
  - Added an Audit Logger toggle control to test class component unmounting.

- **Styling (`src/App.css` & `src/index.css`):**
  - Designed clean, beginner-to-intermediate plain CSS using standard HTML elements, borders, padding, CSS Grid, and Flexbox.
  - Implemented complete `.light-theme` and `.dark-theme` styles without external CSS libraries or frameworks.

- **Documentation & Analysis (`README.md`):**
  - Provided project overview, feature breakdown, and setup/run instructions.
  - Included a 250–300 word section titled **"Theoretical Analysis: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)"** comparing initial load, server execution, performance, SEO, and hosting trade-offs for e-commerce dashboards.

### Refinements & Code Cleanup
- Removed all inline, block, and JSX comments across all JavaScript, JSX, and CSS files in `src/`.
- Configured `.oxlintrc.json` to support educational lifecycle patterns with 0 warnings and 0 errors.
- Verified successful production build (`npm run build`) and linting (`npm run lint`).
- Initialized Git repository, committed codebase, and pushed branch `main` to `https://github.com/SaifDevAI/web-engineering-inventory-dashboard`.
