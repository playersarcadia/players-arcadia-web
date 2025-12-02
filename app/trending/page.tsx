import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending",
  description: "Check out the trending tournaments and events on Players Arcadia.",
};

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#082C73] mb-6">
          Trending
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Discover the most popular tournaments and trending events in the esports community.
          </p>
          <p className="text-gray-600">
            This page is under construction. More content will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}

