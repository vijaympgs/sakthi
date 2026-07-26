"use client";

import { useProductSpecs } from "@/hooks/useQueries";

export function ProductSpecsSection({ slug }: { slug: string }) {
  const { data } = useProductSpecs(slug);
  if (!data?.length) return null;

  const g = (data as Array<{ name?: string; subtitle?: string; columns?: { key: string; label: string }[]; rows?: { label?: string; values?: { column_key: string; value: string }[] }[] }>)[0];
  if (!g?.columns?.length || !g?.rows?.length) return null;

  const title = g.name ?? "Specifications";
  const columns = g.columns;
  const rows = g.rows.map((r) => {
    const obj: Record<string, string> = {};
    (r.values ?? []).forEach((v) => { obj[v.column_key] = v.value; });
    return obj;
  });

  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-page">
        <h2 className="heading-md text-primary-500 mb-2">{title}</h2>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-500 text-white">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap text-gray-600 border-b border-gray-100">
                      {String(row[col.key] ?? "\u2014")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
