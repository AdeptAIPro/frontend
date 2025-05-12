
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  background?: "light" | "dark" | "gradient";
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  background = "light",
}: CTASectionProps) => {
  return (
    <section
      className={`py-20 px-4 ${
        background === "light"
          ? "bg-muted"
          : background === "dark"
          ? "bg-secondary text-white"
          : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
      }`}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          {title}
        </h2>
        <p
          className={`text-lg mb-8 max-w-xl mx-auto ${
            background !== "light" ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={primaryButtonLink}>
            <Button
              size="lg"
              className={`group ${
                background !== "light"
                  ? "bg-white text-primary hover:bg-white/90"
                  : ""
              }`}
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink}>
              <Button
                size="lg"
                variant={background !== "light" ? "outline" : "secondary"}
                className={
                  background !== "light"
                    ? "border-white text-black hover:bg-white/10"
                    : ""
                }
              >
                {secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
