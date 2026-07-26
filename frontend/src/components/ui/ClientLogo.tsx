import { getImageUrl } from "@/lib/utils";

interface ClientLogoProps {
  name: string;
  logo: string;
  website?: string;
}

export function ClientLogo({ name, logo, website }: ClientLogoProps) {
  const content = (
    <div className="flex items-center justify-center p-6 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300">
      <img
        src={getImageUrl(logo)}
        alt={name}
        className="max-h-12 max-w-[140px] object-contain"
      />
    </div>
  );

  if (website) {
    return (
      <a href={website} target="_blank" rel="noopener noreferrer" title={name}>
        {content}
      </a>
    );
  }

  return <div title={name}>{content}</div>;
}