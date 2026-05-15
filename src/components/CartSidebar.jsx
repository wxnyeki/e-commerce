import { X, Trash2, Plus, Minus } from "lucide-react";

function CartSidebar({ cart, isOpen, onClose, updateQuantity, removeItem }) {
  // Calculate total price (removing the '$' sign to do math)
  const total = cart.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : item.price;
    return acc + (price * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay/Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black">YOUR CART</h2>
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            </div>
            <button onClick={onClose}>
            <X size={24}/>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center mt-20">
                <p className="text-zinc-500">Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 mb-6 bg-zinc-50 p-3 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg" 
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-400"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                    <p className="text-zinc-500 text-xs mt-1 mb-3">{item.price}</p>
                    
                    <div className="flex items-center gap-3 bg-white border border-zinc-200 w-fit rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}

                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14}/>
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="hover:text-zinc-500"
                      >
                        <Plus size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Section */}
          <div className="border-t border-zinc-100 pt-6 mt-4">
            <div className="flex justify-between mb-4">
              <span className="text-zinc-500 font-medium">Total</span>
              <span className="font-black text-xl">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">
              CHECKOUT
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CartSidebar;