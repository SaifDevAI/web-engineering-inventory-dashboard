import CardWrapper from './CardWrapper';

export default function ProductCard({ product, onUpdateStock, onDeleteProduct }) {
  const { id, name, category, price, stock } = product;

  const renderStockBadge = () => {
    if (stock === 0) {
      return <span className="badge badge-out-of-stock">Out of Stock</span>;
    } else if (stock <= 5) {
      return <span className="badge badge-low-stock">Low Stock</span>;
    } else {
      return <span className="badge badge-in-stock">In Stock</span>;
    }
  };

  return (
    <CardWrapper title={name}>
      <div className="product-details">
        <p className="product-category">
          <strong>Category:</strong> {category}
        </p>
        <p className="product-price">
          <strong>Price:</strong> ${Number(price).toFixed(2)}
        </p>
        <p className="product-stock">
          <strong>Stock Quantity:</strong> {stock} units
        </p>
        <div className="product-status">
          <strong>Status:</strong> {renderStockBadge()}
        </div>
      </div>

      <div className="product-actions">
        <button
          type="button"
          className="action-btn stock-inc-btn"
          onClick={() => onUpdateStock(id, stock + 1)}
        >
          +1 Stock
        </button>
        <button
          type="button"
          className="action-btn stock-dec-btn"
          disabled={stock <= 0}
          onClick={() => onUpdateStock(id, Math.max(0, stock - 1))}
        >
          -1 Stock
        </button>
        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => onDeleteProduct(id)}
        >
          Delete
        </button>
      </div>
    </CardWrapper>
  );
}
