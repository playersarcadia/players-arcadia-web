import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChromeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 min-h-screen bg-white flex flex-col">
      <Header />
      <main
        className="pt-16 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-24 flex-1"
        id="main-content"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
