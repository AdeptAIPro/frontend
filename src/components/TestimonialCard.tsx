
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  image?: string;
  className?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  image,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-8 shadow-sm border border-border relative",
        className
      )}
    >
      <div className="absolute -top-3 left-8 transform rotate-45 w-6 h-6 bg-white border-l border-t border-border" />
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <blockquote className="text-lg mb-6">{quote}</blockquote>
      <div className="flex items-center">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
