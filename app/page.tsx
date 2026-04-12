import type { Metadata } from "next";
import GamersArcLanding from "@/components/GamersArcLanding";
import "./gamers-arc-landing.css";

export const metadata: Metadata = {
  title: {
    absolute: "GamersArc — Compete. Conquer. Cash Out.",
  },
  description:
    "GamersArc is where real skill meets real money. Challenge rivals, enter tournaments, build your squad, and turn every match into an opportunity to win big.",
  openGraph: {
    title: "GamersArc — Compete. Conquer. Cash Out.",
    description:
      "GamersArc is where real skill meets real money. Challenge rivals, enter tournaments, build your squad, and turn every match into an opportunity to win big.",
  },
  twitter: {
    title: "GamersArc — Compete. Conquer. Cash Out.",
    description:
      "GamersArc is where real skill meets real money. Challenge rivals, enter tournaments, build your squad, and turn every match into an opportunity to win big.",
  },
};

export default function Home() {
  return <GamersArcLanding />;
}
