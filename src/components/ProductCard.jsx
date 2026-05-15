import { Heart } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-zinc-600 mb-4">
          {product.price}
        </p>

        <div className="flex items-center justify-between">
          <button className="bg-black text-white px-5 py-3 rounded-xl text-sm">
            ADD TO CART
          </button>

          <Heart />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
