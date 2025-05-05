import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className={`inline-flex items-center justify-center w-14 h-14 ${color} rounded-full mb-4`}>
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-medium">{description}</p>
    </div>
  );
}
