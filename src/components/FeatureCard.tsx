
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  accentColor?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  accentColor = "bg-primary/10 text-primary",
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group p-6 rounded-xl bg-white border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
          accentColor
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
