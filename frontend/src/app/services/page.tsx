import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ServicesPage } from "@/components/sections/ServicesPage";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}