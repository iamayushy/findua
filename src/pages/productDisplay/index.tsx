import { useParams, useNavigate } from "react-router";
import { useGetProductDetails } from "@/api/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/store/CartContext";
import { getProductStock } from "@/data/inventory";
import "./index.scss";

const ProductDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, addItem, updateQuantity } = useCart();

  const { data: product } = useGetProductDetails({
    productId: id || "",
  });

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const stock = getProductStock(product.id);
  const isOutOfStock = stock <= 0;
  const isMaxStockReached = quantity >= stock;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <div className="pdp-container">
      <div className="pdp-header">
        <Button onClick={() => navigate("/products")} className="back-btn">
          <Button.Icon><ArrowLeft size={16} /></Button.Icon>
          <Button.Text>Back to Products</Button.Text>
        </Button>
      </div>

      <div className="pdp-layout">
        <div className={`pdp-left ${isOutOfStock ? "out-of-stock-image" : ""}`}>
          <div className="pdp-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </div>

        <div className="pdp-right">
          <div className="pdp-badges">
            {product.category && <span className="pdp-category">{product.category}</span>}
            {isOutOfStock ? (
              <span className="pdp-stock-badge out-of-stock">Out of Stock</span>
            ) : stock <= 3 ? (
              <span className="pdp-stock-badge low-stock">Only {stock} items left in stock</span>
            ) : null}
          </div>
          <h1 className="pdp-title">{product.title}</h1>

          {product.rating && (
            <div className="pdp-rating">
              <span className="star-icon">★</span>
              <span className="rate">{product.rating.rate}</span>
              <span className="count">({product.rating.count} reviews)</span>
            </div>
          )}

          <div className="pdp-price">${product.price?.toFixed(2)}</div>
          <p className="pdp-description">{product.description}</p>

          <div className="pdp-actions">
            {isOutOfStock ? (
              <Button className="add-to-cart-btn" disabled>
                <Button.Text>Out of Stock</Button.Text>
              </Button>
            ) : quantity > 0 ? (
              <div className="pdp-qty-selector">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                  disabled={isMaxStockReached}
                >
                  +
                </button>
              </div>
            ) : (
              <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                <Button.Text>Add to Cart</Button.Text>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
export { ProductDisplay };
