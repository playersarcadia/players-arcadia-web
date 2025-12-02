import Image from "next/image";

export default function StrengthenCommunity() {
  return (
    <section className="py-12 md:py-16 bg-gray-100 rounded-2xl my-8 md:my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="px-6 md:px-8 lg:px-12 order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#082C73] mb-6 leading-tight">
            STRENGTHEN YOUR COMMUNITY
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Create Or Join Pro And Training Tournaments, Challenge Top Teams, And Play For Big Rewards. Built For Team Leaders, Loved By Players.
          </p>
          <button 
            className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-8 py-3 rounded-lg font-semibold text-base hover:from-[#e5c047] hover:to-[#c9a429] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-gray-100"
            aria-label="Learn more about strengthening your community"
          >
            Learn More
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="px-6 md:px-8 lg:px-12 order-1 lg:order-2">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Placeholder Background - Replace with actual image later */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300/80 to-gray-400/80">
              <div className="absolute inset-0 bg-[url('/images/football-player.jpg')] bg-cover bg-center opacity-60 transition-transform duration-500 hover:scale-110"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Football Player Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

