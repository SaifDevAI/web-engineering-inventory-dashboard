import { useState, useEffect, useCallback, useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Header from './components/functional/Header';
import InventoryMetrics from './components/functional/InventoryMetrics';
import ProductForm from './components/functional/ProductForm';
import ProductList from './components/functional/ProductList';
import AuditLogger from './components/class/AuditLogger';
import './App.css';

const defaultInitialProducts = [
  { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 99.99, stock: 12 },
  { id: 2, name: 'Classic Cotton Crewneck T-Shirt', category: 'Clothing', price: 19.99, stock: 4 },
  { id: 3, name: 'Organic Japanese Green Tea', category: 'Grocery', price: 8.50, stock: 0 },
];

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('inventory_products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load initial products from localStorage:', error);
    }
    return defaultInitialProducts;
  });

  const [latestAction, setLatestAction] = useState(null);
  const [showLogger, setShowLogger] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('inventory_products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to persist products to localStorage:', error);
    }
  }, [products]);

  useEffect(() => {
    document.title = `Inventory (${products.length} items)`;
  }, [products]);

  const handleAddProduct = useCallback((newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setLatestAction({
      id: Date.now(),
      message: `Added product: "${newProduct.name}" (Stock: ${newProduct.stock})`,
      timestamp: new Date().toLocaleTimeString(),
    });
  }, []);

  const handleUpdateStock = useCallback((productId, newStock) => {
    setProducts((prevProducts) => {
      let updatedItemName = '';
      const nextProducts = prevProducts.map((p) => {
        if (p.id === productId) {
          updatedItemName = p.name;
          return { ...p, stock: newStock };
        }
        return p;
      });

      if (updatedItemName) {
        setLatestAction({
          id: Date.now(),
          message: `Updated stock for "${updatedItemName}" to ${newStock}`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      return nextProducts;
    });
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    setProducts((prevProducts) => {
      const targetProduct = prevProducts.find((p) => p.id === productId);
      const nextProducts = prevProducts.filter((p) => p.id !== productId);

      if (targetProduct) {
        setLatestAction({
          id: Date.now(),
          message: `Deleted product: "${targetProduct.name}"`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      return nextProducts;
    });
  }, []);

  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Header />

      <main className="main-content">
        <section className="section-block">
          <InventoryMetrics products={products} />
        </section>

        <section className="section-block">
          <ProductForm onAddProduct={handleAddProduct} />
        </section>

        <section className="section-block">
          <ProductList
            products={products}
            onUpdateStock={handleUpdateStock}
            onDeleteProduct={handleDeleteProduct}
          />
        </section>

        <section className="section-block logger-controls">
          <button
            type="button"
            className="toggle-logger-btn"
            onClick={() => setShowLogger((prev) => !prev)}
          >
            {showLogger ? 'Hide Audit Logger' : 'Show Audit Logger'} (Toggle Audit Logger)
          </button>
        </section>

        {showLogger && (
          <section className="section-block">
            <AuditLogger latestAction={latestAction} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>E-Commerce Inventory &amp; Stock Management Dashboard &bull; Web Engineering Assignment</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
