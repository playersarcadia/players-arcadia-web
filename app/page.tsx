import Hero from "@/components/Hero";
import UpcomingTournaments from "@/components/UpcomingTournaments";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <UpcomingTournaments />
    </div>
  );
}

