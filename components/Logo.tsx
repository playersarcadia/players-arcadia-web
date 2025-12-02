import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  imagePath?: string;
}

export default function Logo({ imagePath = "/assets/logos/player-arcadia-logo.png" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center flex-shrink-0">
        <Image
          src={imagePath}
          alt="PlayersArcadia Logo"
          width={120}
          height={120}
          className="group-hover:scale-110 transition-transform duration-200 object-contain w-full h-full"
          priority
        />
      </div>
    </Link>
  );
}
