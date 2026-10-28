import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>E-Commerce Inventory Dashboard</h1>
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
        >
          {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
        </button>
      </div>
    </header>
  );
}
