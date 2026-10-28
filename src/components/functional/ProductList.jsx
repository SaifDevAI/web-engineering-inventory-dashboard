import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onUpdateStock, onDeleteProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      let matchesStock = true;
      if (selectedStockStatus === 'In Stock') {
        matchesStock = product.stock > 5;
      } else if (selectedStockStatus === 'Low Stock') {
        matchesStock = product.stock > 0 && product.stock <= 5;
      } else if (selectedStockStatus === 'Out of Stock') {
        matchesStock = product.stock === 0;
      }

      return matchesCategory && matchesStock;
    });
  }, [products, selectedCategory, selectedStockStatus]);

  return (
    <section className="product-list-section">
      <div className="filter-controls-bar">
        <div className="filter-group">
          <label htmlFor="filter-category">Filter by Category:</label>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-stock">Filter by Stock Status:</label>
          <select
            id="filter-stock"
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock (&gt; 5)</option>
            <option value="Low Stock">Low Stock (1 - 5)</option>
            <option value="Out of Stock">Out of Stock (0)</option>
          </select>
        </div>

        <div className="filter-count">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products available in inventory.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdateStock={onUpdateStock}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
