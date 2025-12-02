import Hero from "@/components/Hero";
import UpcomingTournaments from "@/components/UpcomingTournaments";
import ProTools from "@/components/ProTools";
import StrengthenCommunity from "@/components/StrengthenCommunity";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <UpcomingTournaments />
      <ProTools />
      <StrengthenCommunity />
      <JoinCTA />
      <Footer />
    </div>
  );
}

