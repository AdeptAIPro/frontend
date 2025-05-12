
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl mx-auto mb-12",
        align === "left" && "text-left ml-0",
        align === "center" && "text-center",
        align === "right" && "text-right mr-0",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground mb-2">{subtitle}</p>
      )}
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
