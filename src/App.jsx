import{Routes, Route, useNavigate} from "react-router-dom"
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const navigate = useNavigate();
  const[cart, setCart] = useState([]);
  const[isCartOpen,setIsCartOpen] =useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const[favorites, setFavorites] = useState([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const[currentPage, setCurrentPage] = useState(1);
  // this helps in showing all products only when the shop now button is clicked
  const [hasStartedShopping, sethasStartedShopping] = useState(false); 
  //function to fetch all product to use with shop now button
  const fetchAllProducts = async() =>{
    setCurrentPage (1); //to reset the page according to selected filters
    setIsLoading(true);
    sethasStartedShopping(true);
     try {
    const response = await fetch (`https://fakestoreapi.com/products`);
    const data = await response.json();
    // here we are matching dat to match the components this.props
    const formattedData = data.map(item => ({
      id: item.id,
      name: item.title,
      price: `$${item.price}`,
      image: item.image,
    }));
    setProducts(formattedData)
  } catch (error){
    console.error("Filter error:", error)
  } finally{
    setIsLoading(false)
  };
  }
 //function to fetch data from API by category
 const fetchByCategory = async (categoryName ) =>{
    setCurrentPage(1); // reset the page according to filter change
    setIsLoading(true);
    const categoryMap ={
      "Men": "men's clothing",
      "Women": "women's clothing",
      "Accessories": "jewelery",
      "Vintage":"men's clothing"
    };
    const apiCategory = categoryMap[categoryName] || categoryName; 
  try {
    const response = await fetch (`https://fakestoreapi.com/products/category/${apiCategory}`);
    const data = await response.json();
    // here we are matching dat to match the components this.props
    const formattedData = data.map(item => ({
      id: item.id,
      name: item.title,
      price: `$${item.price}`,
      image: item.image,
    }));
    setProducts(formattedData)
  } catch (error){
    console.error("Filter error:", error)
  } finally{
    setIsLoading(false)
  };
}
  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if(existingItem) {
        return prev.map((item) =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity: 1}];
    });  
  };
  //function to add likes on products
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isAlreadyLiked = prev.find((item) => item.id === product.id);
      if (isAlreadyLiked){
        //this removes an item if its id does not much any item id
        return prev.filter((item) => item.id !== product.id);
      }
      return[...prev, product] // this adds an item to the favorite list
    });
  }
  // setting the number of products to show in one currentPage
  const productsPerPage = 4;
  //the function to filter products when searching
  const displayProducts = products
  .filter((p) => p.name.toLowerCase().includes(searchProduct.toLowerCase()))
  .filter((p) => (showFavoritesOnly ? favorites.some(f => f.id === p.id) : true));
  // calclating the indexes of products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentItems = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(displayProducts.length/ productsPerPage);
  // function to help in changing the totalPages
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex min-h-screen bg-zinc-100 text-black">
      <CartSidebar
      cart={cart} 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)}/>
      <main className="flex-1 p-6">
        <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)}
        searchProduct={searchProduct}
        onSearchChange={setSearchProduct}
        favoritesCount={favorites.length}
        onToggleFavorites={() => {setShowFavoritesOnly(!showFavoritesOnly)
        navigate(showFavoritesOnly ? "/shop" : "/favorites")
        }}
        isShowingFavorites = {showFavoritesOnly}
        />
         {/* this shows Hero and categories if we aren't showing the favorites products */}
     <Routes>
      // this sets the the home page navigation
       <Route path="/" element= {<Hero onShopNow = { () => {
       fetchAllProducts();
        navigate("/shop");
       }}/>} />
      // this will set the shop page navigation
        <Route path="/shop" element ={
          <>
        <Categories  onCategoryClick={fetchByCategory}/>
          {isLoading ? (
          <div className="text-center py-20"> Loading...</div>
        
        ) : (
          <>
         
          <FeaturedProducts 
          products={currentItems} 
          onAddToCart ={addToCart} 
          onFavorite ={toggleFavorite}
          favoriteIds ={favorites.map(f => f.id)}
          />
          
          <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          />
        </>
        )}
        </>
        }
        />
        //this will show the favorite page
        <Route path="/favorites" element={
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black uppercase">Your Favorites</h2>
                  <button onClick={() => navigate("/shop")} className="underline">
                    BACK TO SHOP
                  </button>
                </div>
                <FeaturedProducts 
                  products={favorites} // Specifically show favorites
                  onAddToCart={addToCart} 
                  onFavorite={toggleFavorite}
                  favoriteIds={favorites.map(f => f.id)}
                />
              </div>  
        }
        />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
