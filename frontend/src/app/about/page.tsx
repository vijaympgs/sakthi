import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/sections/AboutPage";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}