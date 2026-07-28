export function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="transition-colors duration-200 flex items-center justify-center">
      <span className="text-lg font-bold text-gray-400">{name}</span>
    </div>
  );
}
