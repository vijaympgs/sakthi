import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PRODUCT_CATALOG } from "@/lib/productData";

export const metadata: Metadata = {
  title: "Touch Screen Kiosk - Sakthi Solutions | Speed Touch Series 19\" to 55\"",
  description: "Godspeed Speed Touch Series touch screen kiosks from 19\" to 55\". Floor standing and half standing configurations. IR touch, capacitive touch options. For education, retail, public spaces and events.",
};

const data = PRODUCT_CATALOG.touchScreenKiosk;

export default function TouchScreenKioskPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Speed Touch Series Kiosk" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Speed Touch Series Touch Screen Kiosk</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Touch screen kiosk available from 19&quot; to 55&quot;. Floor standing and half standing configurations.
            High quality IR, resistance and capacitive touch options with industrial mother board.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Main Features</h2>
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.mainFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-gray-100">
                <div className="w-6 h-6 bg-accent-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-6">{data.lcdSpecs.title}</h2>
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-500 text-white">
                  {data.lcdSpecs.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.lcdSpecs.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                    {data.lcdSpecs.columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 whitespace-nowrap border-b border-gray-100 ${col.key === "param" ? "font-semibold text-primary-500" : "text-gray-600"}`}>
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
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            <div>
              <h2 className="heading-sm text-primary-500 mb-4">{data.touchSpecs.title}</h2>
              <div className="border border-gray-200">
                {data.touchSpecs.rows.map((row, i) => (
                  <div key={i} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-surface-muted" : "bg-white"}`}>
                    <div className="w-48 px-4 py-2.5 font-semibold text-primary-500 text-sm">{row.param}</div>
                    <div className="flex-1 px-4 py-2.5 text-sm text-gray-600">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="heading-sm text-primary-500 mb-4">{data.pcSpecs.title}</h2>
              <div className="border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-500 text-white">
                      {data.pcSpecs.columns.map((col) => (
                        <th key={col.key} className="px-4 py-2.5 text-left font-semibold">{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.pcSpecs.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                        {data.pcSpecs.columns.map((col) => (
                          <td key={col.key} className="px-4 py-2.5 text-gray-600 border-b border-gray-100">
                            {String((row as Record<string, string>)[col.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            <div>
              <h2 className="heading-sm text-primary-500 mb-4">{data.environment.title}</h2>
              <div className="border border-gray-200">
                {data.environment.rows.map((row, i) => (
                  <div key={i} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
                    <div className="w-48 px-4 py-2.5 font-semibold text-primary-500 text-sm">{row.param}</div>
                    <div className="flex-1 px-4 py-2.5 text-sm text-gray-600">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="heading-sm text-primary-500 mb-4">{data.case.title}</h2>
              <div className="border border-gray-200">
                {data.case.rows.map((row, i) => (
                  <div key={i} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
                    <div className="w-48 px-4 py-2.5 font-semibold text-primary-500 text-sm">{row.param}</div>
                    <div className="flex-1 px-4 py-2.5 text-sm text-gray-600">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="bg-accent-50 border border-accent-200 p-6 max-w-4xl mx-auto">
            <h2 className="heading-sm text-primary-500 mb-3">Additional Notes</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.notes}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Touch Screen Kiosks?</h2>
          <p className="text-gray-500 mb-6">Contact us for configuration, customization and deployment planning.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}