import { useGetProductListing } from "@/api/products";
import { useSearchParams } from "react-router";
import ProductCard from "./product-card";
import "./index.scss";

const ProductListing = () => {
    const { data } = useGetProductListing({});
    const [searchParams, setSearchParams] = useSearchParams();

    const searchVal = searchParams.get("search") || "";
    const categoryVal = searchParams.get("category") || "all";

    const categories = data
        ? Array.from(new Set(data.map((item: any) => item.category)))
        : [];

    const handleCategorySelect = (category: string) => {
        setSearchParams((prev) => {
            if (category && category !== "all") {
                prev.set("category", category);
            } else {
                prev.delete("category");
            }
            return prev;
        });
    };

    const filteredProducts = data?.filter((item: any) => {
        const matchesCategory = categoryVal === "all" || item.category === categoryVal;
        const matchesSearch =
            item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
            (item.description &&
                item.description.toLowerCase().includes(searchVal.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="product-listing-page">
            <div className="sidebar">
                <h3 className="sidebar-title">Categories</h3>
                <ul className="category-list">
                    <li
                        className={`category-item ${categoryVal === "all" ? "active" : ""}`}
                        onClick={() => handleCategorySelect("all")}
                    >
                        All Categories
                    </li>
                    {categories.map((cat: any) => (
                        <li
                            key={cat}
                            className={`category-item ${categoryVal === cat ? "active" : ""}`}
                            onClick={() => handleCategorySelect(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                
                <section className="products">
                    {filteredProducts?.map((item: any, index: number) => (
                        <ProductCard
                            className="card"
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            category={item.category}
                            description={item.description}
                            rating={item.rating}
                            isPriority={index < 2}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default ProductListing;