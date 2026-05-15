import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 mb-8 shadow-sm">
      <h1 className="text-2xl font-black">
        CULTURE THRIFTS
      </h1>

      <div className="hidden lg:flex gap-6 font-medium">
        <button>Men</button>
        <button>Women</button>
        <button>Accessories</button>
        <button>Sale</button>
      </div>

      <div className="flex items-center gap-3 bg-zinc-100 px-4 py-2 rounded-full w-[320px]">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex gap-5">
        <Heart />
        <ShoppingCart />
        <User />
        <Menu />
      </div>
    </nav>
  );
}

export default Navbar;
