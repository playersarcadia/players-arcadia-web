import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold text-[#082C73] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#e5c047] hover:to-[#c9a429] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

