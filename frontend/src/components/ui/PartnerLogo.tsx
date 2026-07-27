const BRAND_COLORS: Record<string, string> = {
  Godspeed: "#1A56DB",
  Samsung: "#1428A0",
  LG: "#A50034",
  HP: "#0096D6",
  DELL: "#007DB8",
  Epson: "#003399",
  Posiflex: "#E2231A",
};

export function PartnerLogo({ name }: { name: string }) {
  const brandColor = BRAND_COLORS[name] || "#333";

  const logos: Record<string, React.ReactNode> = {
    Godspeed: (
      <svg viewBox="0 0 120 32" className="h-6 w-auto" fill={brandColor}>
        <text x="0" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="800" letterSpacing="-0.5">GODSPEED</text>
      </svg>
    ),
    Samsung: (
      <svg viewBox="0 0 120 28" className="h-5 w-auto" fill={brandColor}>
        <ellipse cx="60" cy="14" rx="58" ry="12" fill="none" stroke={brandColor} strokeWidth="1.5"/>
        <text x="60" y="18" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.5">SAMSUNG</text>
      </svg>
    ),
    LG: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
        <circle cx="24" cy="24" r="22" stroke={brandColor} strokeWidth="2"/>
        <path d="M16 14v16h10" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="20" r="2" fill={brandColor}/>
      </svg>
    ),
    HP: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill={brandColor}>
        <circle cx="24" cy="24" r="22" fill="none" stroke={brandColor} strokeWidth="2"/>
        <text x="24" y="30" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700">hp</text>
      </svg>
    ),
    DELL: (
      <svg viewBox="0 0 80 28" className="h-5 w-auto" fill={brandColor}>
        <circle cx="14" cy="14" r="10" fill="none" stroke={brandColor} strokeWidth="1.5"/>
        <text x="14" y="18" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="700">D</text>
        <text x="48" y="19" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="800" letterSpacing="1">ELL</text>
      </svg>
    ),
    Epson: (
      <svg viewBox="0 0 80 24" className="h-5 w-auto" fill={brandColor}>
        <text x="0" y="19" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="800" letterSpacing="0.5">EPSON</text>
      </svg>
    ),
    Posiflex: (
      <svg viewBox="0 0 100 24" className="h-5 w-auto" fill={brandColor}>
        <text x="0" y="19" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="700" letterSpacing="0.5">POSIFLEX</text>
      </svg>
    ),
  };

  return (
    <div className="transition-colors duration-200 flex items-center justify-center" style={{ color: brandColor }}>
      {logos[name] || (
        <span className="text-lg font-bold">{name}</span>
      )}
    </div>
  );
}