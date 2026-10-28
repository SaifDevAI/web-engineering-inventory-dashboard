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

## Theoretical Analysis: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

Client-Side Rendering (CSR), which is used in our Vite and React single-page application, handles all rendering inside the user browser. When a user opens the website, the web server sends a small index.html file containing an empty root div and a script tag. The browser then downloads the JavaScript bundle, executes React, reads our product data from localStorage, and builds the DOM elements on the screen. In contrast, Server-Side Rendering (SSR), which is common in frameworks like Next.js, executes React components on a Node.js web server for every user request. The server generates complete HTML pages filled with content and sends them directly to the client browser, which then hydrates the page to attach click events and state.

These two architectures bring clear trade-offs in performance, search engine optimization, and hosting costs. On initial page load, CSR can feel slower on cold visits because the user has to wait for the JavaScript bundle to download before anything shows up. However, once loaded, CSR feels very fast because switching filters or updating stock quantities happens instantly in local memory without page refreshes. SSR provides faster initial content delivery and better SEO because web crawlers can read ready-made HTML immediately. This is important for public e-commerce product pages that need to rank on Google search results.

Hosting is also different. CSR projects only need static file hosting like GitHub Pages or basic cloud storage, which is cheap and easy to scale. SSR requires running active Node.js servers, which adds server costs and maintenance. For our internal inventory dashboard, CSR is the better choice because store managers access it behind a private login. SEO does not matter here, and fast client-side interactions make daily stock management simple and responsive.
