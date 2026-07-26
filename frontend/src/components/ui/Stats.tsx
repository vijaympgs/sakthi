interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  stats: StatItem[];
  className?: string;
}

export function Stats({ stats, className }: StatsProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className || ""}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">{stat.value}</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}