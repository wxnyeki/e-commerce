function Categories( {onCategoryClick}) {
  const categories = [
    "Men",
    "Women",
    "Accessories",
    "Vintage",
  ];

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-black mb-6">
        Search by Categories
      </h2>

      <div className="grid grid-cols-5 md:grid-cols-5 gap-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryClick(category)}
            className="bg-white p-10 rounded-2xl text-center font-semibold shadow-sm"
          type="button"
          >
            {category}
            
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
