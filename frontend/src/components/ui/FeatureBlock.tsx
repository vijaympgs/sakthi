interface FeatureBlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

export function FeatureBlock({ icon, title, description, image }: FeatureBlockProps) {
  return (
    <div className="border border-gray-100 p-6">
      {image && (
        <div className="mb-4 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </div>
      )}
      {icon && <div className="mb-3 text-accent-500">{icon}</div>}
      <h3 className="font-semibold text-primary-500 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}