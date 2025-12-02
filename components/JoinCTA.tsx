export default function JoinCTA() {
  return (
    <section className="relative w-full my-8 md:my-12 rounded-2xl overflow-hidden">
      {/* Full-width Background Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-900 to-black">
        {/* Placeholder Background - Replace with actual image later */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90">
          <div className="absolute inset-0 bg-[url('/images/soldiers-bg.jpg')] bg-cover bg-center opacity-50"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Join PlayersArcadia Today!
          </h2>
          <button className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-10 py-4 rounded-lg font-semibold text-lg md:text-xl hover:from-[#e5c047] hover:to-[#c9a429] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Download App
          </button>
        </div>
      </div>
    </section>
  );
}

