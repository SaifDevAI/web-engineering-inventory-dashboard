import { useMemo } from 'react';
import CardWrapper from './CardWrapper';

export default function InventoryMetrics({ products }) {
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
    const lowStockCount = products.filter(
      (item) => item.stock > 0 && item.stock <= 5
    ).length;
    const outOfStockCount = products.filter(
      (item) => Number(item.stock) === 0
    ).length;

    return {
      totalProducts,
      totalStock,
      lowStockCount,
      outOfStockCount,
    };
  }, [products]);

  return (
    <CardWrapper title="Inventory Metrics">
      <div className="metrics-container">
        <div className="metric-box">
          <span className="metric-label">Total Products</span>
          <span className="metric-value">{metrics.totalProducts}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Total Stock Quantity</span>
          <span className="metric-value">{metrics.totalStock}</span>
        </div>
        <div className="metric-box low-stock-box">
          <span className="metric-label">Low Stock (≤ 5)</span>
          <span className="metric-value">{metrics.lowStockCount}</span>
        </div>
        <div className="metric-box out-of-stock-box">
          <span className="metric-label">Out of Stock</span>
          <span className="metric-value">{metrics.outOfStockCount}</span>
        </div>
      </div>
    </CardWrapper>
  );
}
