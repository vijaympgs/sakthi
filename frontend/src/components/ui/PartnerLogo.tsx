export function PartnerLogo({ name }: { name: string }) {
  const logos: Record<string, React.ReactNode> = {
    Godspeed: (
      <svg viewBox="0 0 120 32" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="800" letterSpacing="-0.5">GODSPEED</text>
      </svg>
    ),
    Samsung: (
      <svg viewBox="0 0 120 28" className="h-5 w-auto" fill="currentColor">
        <ellipse cx="60" cy="14" rx="58" ry="12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <text x="60" y="18" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.5">SAMSUNG</text>
      </svg>
    ),
    LG: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 14v16h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="20" r="2" fill="currentColor"/>
      </svg>
    ),
    HP: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="currentColor">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="24" y="30" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700">hp</text>
      </svg>
    ),
    DELL: (
      <svg viewBox="0 0 80 28" className="h-5 w-auto" fill="currentColor">
        <circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <text x="14" y="18" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="700">D</text>
        <text x="48" y="19" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="800" letterSpacing="1">ELL</text>
      </svg>
    ),
    Epson: (
      <svg viewBox="0 0 80 24" className="h-5 w-auto" fill="currentColor">
        <text x="0" y="19" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="800" letterSpacing="0.5">EPSON</text>
      </svg>
    ),
    Posiflex: (
      <svg viewBox="0 0 100 24" className="h-5 w-auto" fill="currentColor">
        <text x="0" y="19" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="700" letterSpacing="0.5">POSIFLEX</text>
      </svg>
    ),
  };

  return (
    <div className="text-gray-400 group-hover:text-primary-500 transition-colors duration-200 flex items-center justify-center">
      {logos[name] || (
        <span className="text-lg font-bold">{name}</span>
      )}
    </div>
  );
}