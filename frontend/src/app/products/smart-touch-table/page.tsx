import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PRODUCT_CATALOG } from "@/lib/productData";

const data = PRODUCT_CATALOG.smartTouchTable;

export default function SmartTouchTablePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Smart Touch Table" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Touch Table</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Multi-touch tables enabling advanced and intelligent interaction between human and machine.
            Available with foil touch, IR touch and capacitive touch options in 32&quot;, 42&quot; and 46&quot; sizes.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-4xl">
            <h2 className="heading-md text-primary-500 mb-6">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{data.introduction}</p>
            <p className="text-gray-600 leading-relaxed">
              They can be compared to the new generation mobile phones but in a far more complex extent,
              they feature a touch screen on which the user interacts with his fingers, hands or even objects.
              They also have software that interprets the movements, or more accurately manage all the physical
              contacts that the user makes through the surface of the table. Beyond the opportunity to interact
              with the touchpad with multiple fingers at the same time, some tables can handle multiple people simultaneously.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">How Does It Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {data.howItWorks.map((tech) => (
              <div key={tech.title} className="bg-white border border-gray-100 p-6">
                <h3 className="font-semibold text-primary-500 mb-3">{tech.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-4xl">
            <h2 className="heading-md text-primary-500 mb-6">Why Use a Touch Table</h2>
            <p className="text-gray-600 leading-relaxed">{data.whyUse}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Key Features</h2>
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.keyFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 border border-gray-100">
                <div className="w-6 h-6 bg-accent-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-2">{data.specs.title}</h2>
          <p className="text-gray-500 mb-8">Available in 32&quot;, 42&quot; and 46&quot; sizes</p>
          <div className="overflow-x-auto border border-gray-200 max-w-4xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-500 text-white">
                  {data.specs.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left font-semibold">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.specs.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                    {data.specs.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-gray-600 border-b border-gray-100">
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

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">{data.variant21.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h3 className="font-semibold text-primary-500 mb-4">Features</h3>
              <ul className="space-y-2">
                {data.variant21.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-accent-500 mt-2 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-500 mb-4">Applications</h3>
              <ul className="space-y-2">
                {data.variant21.applications.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 mt-2 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Interested in Smart Touch Tables?</h2>
          <p className="text-gray-500 mb-6">Contact us for pricing, customization and deployment consultation.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}