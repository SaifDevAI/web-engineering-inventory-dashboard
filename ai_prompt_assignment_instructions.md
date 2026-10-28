# AI Developer Instructions: E-Commerce Inventory & Stock Management Dashboard

## 1. Role & Core Constraints (CRITICAL)
You are tasked with building a React application for a university Web Engineering assignment ("E-Commerce Inventory & Stock Management Dashboard"). 

**STRICT CONSTRAINTS:**
1. **Keep the Code Basic:** Write beginner-to-intermediate friendly, clean, and readable code. Do NOT use TypeScript, Redux, React Router, or external state/UI libraries. Use standard React (Vite) with plain JavaScript (`.jsx`).
2. **Keep the UI Basic:** Use simple, clean plain CSS (in `App.css` or `index.css`) or basic inline styles. Do NOT use Tailwind CSS, Bootstrap, Material UI, or complex CSS animations. A simple clean layout using basic Flexbox/Grid, standard HTML `<button>`, `<input>`, `<select>`, and basic borders/padding is required.
3. **100% Requirement Compliance:** Every single rubric requirement listed below must be explicitly implemented and easy for an instructor to spot during code review.

---

## 2. Project Directory Structure
You must generate the files following this exact folder structure:

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
│   └── useLocalStorage.js (Optional helper or keep hooks inside components as required)
├── App.jsx
└── App.css
```

---

## 3. Step-by-Step Component & Feature Requirements

### A. Context API (`src/context/ThemeContext.jsx`)
* **Requirement:** Implement `createContext` and `useContext` for Light/Dark mode without prop-drilling.
* **Implementation:**
  * Create `ThemeContext` providing `theme` (`'light'` or `'dark'`) and a `toggleTheme` function.
  * Apply a simple `.light-theme` or `.dark-theme` class to the main wrapper in `App.jsx` that changes background color and text color using basic CSS.

### B. Reusable Wrapper (`src/components/functional/CardWrapper.jsx`)
* **Requirement:** Utilize React Children (`props.children`) to build a flexible container.
* **Implementation:**
  * Create a simple functional component that accepts `{ children, title }` as props and wraps them in a `<div className="card-wrapper">` with a basic border, padding, and background color that adapts to the theme.
  * Use this `CardWrapper` around `ProductForm`, `InventoryMetrics`, `ProductCard`, and `AuditLogger`.

### C. Header & Theme Toggle (`src/components/functional/Header.jsx`)
* **Requirement:** Functional component with ThemeToggle.
* **Implementation:**
  * Display the title: `"E-Commerce Inventory Dashboard"`.
  * Consume `ThemeContext` using `useContext` to render a basic button: `"Switch to Dark/Light Mode"`.

### D. Inventory Metrics (`src/components/functional/InventoryMetrics.jsx`)
* **Requirement:** Modular component showing stock calculations optimized with `useMemo`.
* **Implementation:**
  * Accept `products` array via props.
  * Use `useMemo` to calculate:
    1. Total Products count.
    2. Total Stock Quantity (sum of all product quantities).
    3. Low Stock Items count (items with stock > 0 and <= 5).
    4. Out of Stock Items count (items with stock === 0).
  * Render these metrics inside a simple horizontal flex box.

### E. Product Form (`src/components/functional/ProductForm.jsx`)
* **Requirement:** Functional component using `useState`, `useRef`, and synthetic event `onSubmit`/`onChange`.
* **Implementation:**
  * Form inputs: Product Title (text), Category (select: Electronics, Clothing, Grocery), Price (number), Stock Quantity (number).
  * Manage input states using `useState`.
  * **`useRef` Requirement:** Attach a ref (`titleInputRef`) to the Product Title `<input>`. Automatically focus this input when the component mounts (`useEffect`) AND immediately after the form is submitted.
  * Pass the new product object up to `App.jsx` via an `onAddProduct` callback prop.

### F. Product List & Filtering (`src/components/functional/ProductList.jsx`)
* **Requirement:** Render arrays with `.map()`, unique `key` props, conditional rendering for empty states, and filter controls.
* **Implementation:**
  * Accept `products`, `onUpdateStock`, and `onDeleteProduct` as props.
  * Provide basic filter controls (`useState`) at the top:
    * Filter by Category (`All`, `Electronics`, `Clothing`, `Grocery`).
    * Filter by Stock Status (`All`, `In Stock`, `Low Stock`, `Out of Stock`).
  * Use `useMemo` to compute `filteredProducts`.
  * **Conditional Rendering:**
    * Use ternary operator (`? :`) or logical AND (`&&`) to show `"No products available in inventory."` when `filteredProducts.length === 0`.
  * Map over `filteredProducts` using `Array.prototype.map()` and render `<ProductCard key={product.id} ... />`.

### G. Product Card (`src/components/functional/ProductCard.jsx`)
* **Requirement:** Functional component, props, dynamic JSX `{ ... }`, conditional badges, and synthetic events (`onClick`).
* **Implementation:**
  * Display product name, category, price, and current stock quantity.
  * **Stock Status Badge (Conditional Rendering):**
    * If `stock === 0`: render a red badge `"Out of Stock"`.
    * Else if `stock <= 5`: render an orange badge `"Low Stock"`.
    * Else: render a green badge `"In Stock"`.
  * Provide simple buttons:
    * `"+1 Stock"` and `"-1 Stock"` (disable `-1` when stock is 0) triggering `onUpdateStock(id, newStock)`.
    * `"Delete"` button triggering `onDeleteProduct(id)`.

### H. Class Component & Lifecycle Methods (`src/components/class/AuditLogger.jsx`)
* **Requirement:** Must be a **React Class Component** (`extends React.Component`) using `this.state` and `this.setState()` explicitly, demonstrating all 3 lifecycle methods.
* **Implementation:**
  * **Props:** Receives `latestAction` (an object like `{ id, message, timestamp }` passed down from `App.jsx` whenever an item is added, updated, or deleted).
  * **State (`this.state`):** `{ logs: [], notification: null }`.
  * **`componentDidMount()`:**
    * Read saved logs from `localStorage.getItem('audit_logs')` and call `this.setState({ logs: parsedLogs })`.
  * **`componentDidUpdate(prevProps, prevState)`:**
    * Check if `prevProps.latestAction !== this.props.latestAction` and `this.props.latestAction !== null`.
    * Add the new action log to `this.state.logs`.
    * Save updated logs to `localStorage.setItem('audit_logs', ...)`.
    * Trigger a simple toast/text notification in state (`this.setState({ notification: 'New log recorded!' })`) and set a timer (`this.timer = setTimeout(...)`) to clear the notification after 3 seconds.
  * **`componentWillUnmount()`:**
    * Clear the timeout (`clearTimeout(this.timer)`) to prevent memory leaks.
  * Render a simple list of audit logs and a `"Clear Logs"` button.

### I. Main Application (`src/App.jsx`)
* **Requirement:** Combine all components, manage main inventory state, implement `useEffect` and `useCallback`.
* **Implementation:**
  * Manage `products` state (`useState`), initialized from `localStorage.getItem('inventory_products')` (or a default array of 3 sample products if empty).
  * Manage `latestAction` state (`useState(null)`) to feed into `<AuditLogger />`.
  * Manage a boolean `showLogger` state (`useState(true)`) with a button `"Toggle Audit Logger"` so the instructor can test `componentWillUnmount()` when hiding the logger.
  * **`useEffect` Requirements:**
    1. Sync `products` state to `localStorage` whenever `products` changes.
    2. Dynamically update `document.title = "Inventory (" + products.length + " items)"` whenever `products` changes.
  * **`useCallback` Requirements:**
    * Wrap `handleAddProduct`, `handleUpdateStock`, and `handleDeleteProduct` in `useCallback` so handler references stay stable.
    * Inside each handler, also update `latestAction` with a descriptive log (e.g., `"Added product: Laptop"`, `"Updated stock for Laptop to 4"`, `"Deleted product: Laptop"`).

---

## 4. README.md Requirement (Task 6: Theoretical Analysis)
Generate a `README.md` file that includes:
1. Basic setup instructions (`npm install`, `npm run dev`).
2. **A 250–300 word section titled "Theoretical Analysis: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)"** that directly answers:
   * How CSR (Vite + React SPA) and SSR (Next.js) fundamentally differ in terms of initial page load and server-side execution.
   * The performance, SEO, and hosting trade-offs when choosing between CSR and SSR for an enterprise-grade e-commerce application like this Inventory Dashboard.

---

## 5. Output Instructions for the AI
When generating the response, provide:
1. The complete code for every file listed in the directory structure above, clearly labeled with its file path.
2. Simple, clean CSS in `src/App.css` (using basic borders, light/dark backgrounds, and simple flex layouts).
3. The complete `README.md` containing the 250-300 word CSR vs. SSR comparison.