import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/CartContext';
import { Button } from '@/components/ui/button';
import { getProductStock } from '@/data/inventory';

export function CartDrawer() {
  const {
    cartItems,
    isDrawerOpen,
    removeItem,
    updateQuantity,
    toggleDrawer,
  } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal; 

  if (!isDrawerOpen) return null;

  return (
    <div className="ui-cart-drawer-wrapper">
      <div className="cart-drawer-overlay" onClick={toggleDrawer} />
      
      <aside className="cart-drawer-panel">
        <div className="drawer-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={toggleDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your cart is empty</p>
              <Button onClick={toggleDrawer} className="continue-shopping-btn">
                <Button.Text>Continue Shopping</Button.Text>
              </Button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item) => {
                const stock = getProductStock(item.id);
                return (
                  <li key={item.id} className="cart-item">
                    <div className="item-thumbnail">
                      <img src={item.image} alt={item.title} />
                    </div>
                    
                    <div className="item-details">
                      <span className="item-category">{item.category || 'Product'}</span>
                      <h4 className="item-name">{item.title}</h4>
                      <span className="item-unit-price">${item.price.toFixed(2)}</span>
                      {item.quantity >= stock && (
                        <span className="stock-warning">Max stock reached </span>
                      )}
                      
                      <div className="item-quantity-actions">
                        <div className="quantity-selector">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= stock}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="item-remove-btn"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="bill-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="checkout-btn">
              <Button.Text>Proceed to Checkout</Button.Text>
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
