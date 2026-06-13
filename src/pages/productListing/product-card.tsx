import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useCart } from "@/store/CartContext";
import { getProductStock } from "@/data/inventory";
import type { FC } from "react";
import { StarIcon } from "lucide-react";

interface IProductCard {
    id: number;
    title: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
    rating?: {
        rate: number;
        count: number;
    };
    className?: string;
    isPriority?: boolean;
}

const ProductCard: FC<IProductCard> = ({ id, title, price, image, category, description, rating, className, isPriority }) => {
    const navigate = useNavigate();
    const { cartItems, addItem, updateQuantity } = useCart();
    const cartItem = cartItems.find((item) => item.id === id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const stock = getProductStock(id);
    const isOutOfStock = stock <= 0;
    const isMaxStockReached = quantity >= stock;

    const handleCardClick = () => {
        navigate(`/products/${id}`);
    };

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addItem({ id, title, price, image, category });
        }
    };

    return <Card key={id} className={`${className} ${isOutOfStock ? "card-out-of-stock" : ""}`}>
        <div onClick={handleCardClick} className="card-clickable-area" style={{ cursor: "pointer" }}>
            <Card.Header>
                <div className="product-image-container">
                    <img
                        src={image}
                        alt={title}
                        width="200"
                        height="200"
                        fetchPriority={isPriority ? "high" : "auto"}
                        decoding={isPriority ? "sync" : "async"}
                    />
                </div>
                <div className="card-badges">
                    {category && <span className="category-badge">{category}</span>}
                    {isOutOfStock ? (
                        <span className="stock-badge out-of-stock">Out of Stock</span>
                    ) : stock <= 3 ? (
                        <span className="stock-badge low-stock">Only {stock} left</span>
                    ) : null}
                </div>
            </Card.Header>
            <Card.Content>
                <h4 className="product-title">{title}</h4>
                {rating && (
                    <div className="rating">
                        <StarIcon size={16} fill="goldenrod" stroke="goldenrod"/>
                        <span className="rate">{rating.rate}</span>
                        <span className="count">({rating.count} reviews)</span>
                    </div>
                )}
                {description && <p className="description">{description}</p>}
                <p className="price">${price.toFixed(2)}</p>
            </Card.Content>
        </div>
        <Card.Footer>
            {isOutOfStock ? (
                <Button className="add-to-cart-btn" disabled>
                    <Button.Text>Out of Stock</Button.Text>
                </Button>
            ) : quantity > 0 ? (
                <div className="card-qty-selector">
                    <button
                        onClick={() => updateQuantity(id, quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                        onClick={() => updateQuantity(id, quantity + 1)}
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
        </Card.Footer>
    </Card>;
};

export default ProductCard;