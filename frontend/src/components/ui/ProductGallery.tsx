interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function ProductGallery({ images, columns = 3 }: ProductGalleryProps) {
  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {images.map((img, index) => (
        <div key={index} className="group border border-gray-100 overflow-hidden">
          <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          {img.caption && (
            <div className="px-3 py-2 bg-surface-muted">
              <p className="text-xs text-gray-600">{img.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}