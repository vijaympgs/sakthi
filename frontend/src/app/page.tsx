import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/sections/HomePage";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}