interface ApplicationCardProps {
  title: string;
  description: string;
  image?: string;
}

export function ApplicationCard({ title, description, image }: ApplicationCardProps) {
  return (
    <div className="border border-gray-100 overflow-hidden">
      {image && (
        <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-primary-500 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}