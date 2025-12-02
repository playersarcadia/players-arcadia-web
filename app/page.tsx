import dynamic from "next/dynamic";
import SectionWrapper from "@/components/SectionWrapper";

// Lazy load components for better performance
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse rounded-2xl" />,
});
const UpcomingTournaments = dynamic(() => import("@/components/UpcomingTournaments"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />,
});
const ProTools = dynamic(() => import("@/components/ProTools"), {
  loading: () => <div className="h-64 bg-gray-800 animate-pulse rounded-2xl" />,
});
const StrengthenCommunity = dynamic(() => import("@/components/StrengthenCommunity"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />,
});
const JoinCTA = dynamic(() => import("@/components/JoinCTA"), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse rounded-2xl" />,
});
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SectionWrapper delay={0.1}>
        <UpcomingTournaments />
      </SectionWrapper>
      <SectionWrapper delay={0.2}>
        <ProTools />
      </SectionWrapper>
      <SectionWrapper delay={0.3}>
        <StrengthenCommunity />
      </SectionWrapper>
      <SectionWrapper delay={0.4}>
        <JoinCTA />
      </SectionWrapper>
    </div>
  );
}

