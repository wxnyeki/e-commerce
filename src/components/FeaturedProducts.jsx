import ProductCard from "./ProductCard";

function FeaturedProducts({ products, onAddToCart, onFavorite, favoriteIds}) {
  const safeFavoriteIds = favoriteIds || [];
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black uppercase">
          {products.length > 5 ? "Full Collection" : "Featured Products"}
        </h2>
        <span className="text-zinc-500 font-medium">{products.length} Items</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">      
          {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onFavorite={onFavorite}
            isLiked={safeFavoriteIds.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
