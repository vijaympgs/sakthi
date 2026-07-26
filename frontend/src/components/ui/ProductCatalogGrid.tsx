interface CatalogItem {
  sku: string;
  name: string;
  image: string;
  dimensions?: string;
}

interface CatalogCategory {
  title: string;
  items: CatalogItem[];
}

interface ProductCatalogGridProps {
  categories: CatalogCategory[];
}

export function ProductCatalogGrid({ categories }: ProductCatalogGridProps) {
  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <div key={category.title}>
          <h3 className="heading-sm text-primary-500 mb-6 pb-3 border-b border-gray-200">
            {category.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((item) => (
              <div key={item.sku} className="group border border-gray-100 overflow-hidden">
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-accent-500 font-mono mb-1">{item.sku}</p>
                  <p className="text-sm font-medium text-primary-500">{item.name}</p>
                  {item.dimensions && (
                    <p className="text-xs text-gray-500 mt-1">{item.dimensions}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}