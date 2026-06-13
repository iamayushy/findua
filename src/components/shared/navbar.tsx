import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import { ShoppingCart, Search } from 'lucide-react';
import Input from '@/components/ui/input';
import { useCart } from '@/store/CartContext';
import "@/styles/ui/navbar.scss";

export function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, toggleDrawer } = useCart();

  const searchVal = searchParams.get('search') || '';
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (location.pathname !== '/products') {
      navigate(`/products?search=${encodeURIComponent(val)}`);
      return;
    }

    setSearchParams((prev) => {
      if (val) {
        prev.set('search', val);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handleLogoClick = () => {
    navigate('/products');
  };

  return (
    <header className="ui-navbar">
      <div className="navbar-container">
        <div className="navbar-left" onClick={handleLogoClick}>
          <span className="logo-text">nua</span>
        </div>

        <div className="navbar-center">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchVal}
            onChange={handleSearchChange}
            icon={<Search size={18} />}
          />
        </div>

        <div className="navbar-right">
          <button className="cart-btn" onClick={toggleDrawer} aria-label="Shopping Cart">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
