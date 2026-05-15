function Hero() {
  return (
    <section className="bg-white rounded-3xl p-10 flex items-center justify-between mb-10">
      <div className="max-w-xl">
        <h1 className="text-7xl font-black leading-none mb-6">
          WEAR YOUR CULTURE.
        </h1>

        <p className="text-zinc-600 text-lg mb-8">
          Curated. Thrifted. Authentic.
        </p>

        <button className="bg-black text-white px-8 py-4 rounded-xl">
          SHOP NOW
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
        className="w-[420px] h-[420px] object-cover rounded-3xl"
      />
    </section>
  );
}

export default Hero; 