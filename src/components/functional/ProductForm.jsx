import { useState, useRef, useEffect } from 'react';
import CardWrapper from './CardWrapper';

export default function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Product Title cannot be empty.');
      titleInputRef.current?.focus();
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMessage('Please enter a valid non-negative price.');
      return;
    }

    if (isNaN(parsedStock) || parsedStock < 0) {
      setErrorMessage('Please enter a valid non-negative stock quantity.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: title.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
    };

    onAddProduct(newProduct);

    setTitle('');
    setCategory('Electronics');
    setPrice('');
    setStock('');
    setErrorMessage('');

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  return (
    <CardWrapper title="Add New Product">
      <form onSubmit={handleSubmit} className="product-form">
        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="product-title">Product Title:</label>
          <input
            id="product-title"
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Wireless Mouse"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-category">Category:</label>
          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product-price">Price ($):</label>
            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-stock">Stock Quantity:</label>
            <input
              id="product-stock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Product to Inventory
        </button>
      </form>
    </CardWrapper>
  );
}
