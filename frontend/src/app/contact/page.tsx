import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/sections/ContactPage";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}