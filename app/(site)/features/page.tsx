import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover the powerful features of Players Arcadia - the ultimate esports tournament platform.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Breadcrumbs />
        <h1 className="text-4xl md:text-5xl font-bold text-[#082C73] mb-6">
          Features
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Explore the powerful features that make Players Arcadia the ultimate platform for esports tournaments.
          </p>
          <p className="text-gray-600">
            This page is under construction. More content will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}

