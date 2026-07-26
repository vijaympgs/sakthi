import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PRODUCT_CATALOG } from "@/lib/productData";

export const metadata: Metadata = {
  title: "Video Wall - Sakthi Solutions | Samsung & LG LCD Video Walls 42\" to 55\"",
  description: "Godspeed LCD video walls with original Samsung and LG A+ panels. Available in 42\", 46\" and 55\" with ultra-thin bezel splicing technology. Ideal for security, retail, events and hospitality.",
};

const data = PRODUCT_CATALOG.videoWall;

export default function VideoWallPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Video Wall" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Video Wall</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Godspeed LCD video wall adopted original A+ LCD Panel from SAMSUNG, LG, which brings you perfect
            visual experience. Widely applied in Security system, Shopping mall, Hotel, Exhibition center, Bank.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-4xl">
            <h2 className="heading-md text-primary-500 mb-6">Main Features</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{data.description}</p>
            <p className="text-gray-600 leading-relaxed">
              We keep pace with the latest ultra thin splicing technology, combined with intelligent and
              easy-operation video wall controlling system. Our LCD video wall is enjoying good popularity
              in the market, the most suitable solution will be given to you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-2">{data.specs.title}</h2>
          <p className="text-gray-500 mb-8">{data.specs.subtitle}</p>
          <div className="overflow-x-auto border border-gray-200 max-w-5xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-500 text-white">
                  {data.specs.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.specs.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                    {data.specs.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap text-gray-600 border-b border-gray-100">
                        {String((row as Record<string, string>)[col.key] ?? "\u2014")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="heading-md text-primary-500 mb-6">{data.common.title}</h2>
          <div className="border border-gray-200">
            {data.common.rows.map((row, i) => (
              <div key={i} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-surface-muted" : "bg-white"}`}>
                <div className="w-48 px-4 py-3 font-semibold text-primary-500 text-sm">{row.param}</div>
                <div className="flex-1 px-4 py-3 text-sm text-gray-600">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need a Video Wall Solution?</h2>
          <p className="text-gray-500 mb-6">Contact us for site assessment, configuration planning and installation.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}