interface SpecColumn {
  key: string;
  label: string;
}

interface SpecTableProps {
  title?: string;
  columns: SpecColumn[];
  rows: Record<string, string | number>[];
  highlightColumn?: string;
}

export function SpecTable({ title, columns, rows, highlightColumn }: SpecTableProps) {
  return (
    <div className="border border-gray-200">
      {title && (
        <div className="bg-primary-500 text-white px-6 py-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-muted border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-semibold text-primary-500 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-gray-100 ${rowIndex % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 whitespace-nowrap ${
                      highlightColumn === col.key
                        ? "font-semibold text-primary-500"
                        : "text-gray-600"
                    }`}
                  >
                    {row[col.key] ?? "\u2014"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}