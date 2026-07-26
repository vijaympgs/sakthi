interface Deployment {
  location: string;
  details: string;
}

interface CaseStudyProps {
  title: string;
  client: string;
  description: string;
  deployments: Deployment[];
}

export function CaseStudy({ title, client, description, deployments }: CaseStudyProps) {
  return (
    <div className="border-l-4 border-accent-500 bg-surface-muted p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-500 mb-2">
        Deployment
      </p>
      <h3 className="heading-sm text-primary-500 mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-700 mb-4">{client}</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {deployments.map((d) => (
          <div key={d.location} className="flex items-start gap-3 bg-white p-3 border border-gray-100">
            <div className="w-2 h-2 bg-accent-500 mt-2 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-primary-500">{d.location}</p>
              <p className="text-xs text-gray-500">{d.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}