
import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export const InfoItem = ({ icon: Icon, label, value, className = "" }: InfoItemProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);
