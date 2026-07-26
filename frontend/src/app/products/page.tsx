import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductsPage } from "@/components/sections/ProductsPage";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProductsPage />
      </main>
      <Footer />
    </>
  );
}