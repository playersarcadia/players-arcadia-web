import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Teams",
  description: "Join or create teams on Players Arcadia and compete in esports tournaments.",
};

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Breadcrumbs />
        <h1 className="text-4xl md:text-5xl font-bold text-[#082C73] mb-6">
          Teams
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Create or join teams, manage your roster, and compete in professional esports tournaments.
          </p>
          <p className="text-gray-600">
            This page is under construction. More content will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}

