
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CarouselIndicators from "./CarouselIndicators";
import { useIsMobile } from "@/hooks/use-mobile";

// Optimized hero slide data with placeholder images
const heroSlides = [
  {
    title: "Unlock the power of intelligent automation",
    description: "AdeptAI helps businesses streamline workflows, reduce manual effort, and make smarter decisions with cutting-edge AI tools.",
    image: "/placeholder.svg",
    alt: "AI-powered dashboard visualization"
  },
  {
    title: "AI-Powered Talent Matching",
    description: "Find the perfect candidates for any position with our advanced semantic matching algorithm.",
    image: "/placeholder.svg",
    alt: "Talent matching visualization"
  },
  {
    title: "Streamline Your Compliance",
    description: "Automate compliance checks and verification processes to ensure your organization meets all regulatory requirements.",
    image: "/placeholder.svg",
    alt: "Compliance dashboard"
  },
  {
    title: "Comprehensive Analytics",
    description: "Gain valuable insights with our powerful analytics dashboard, helping you make data-driven decisions.",
    image: "/placeholder.svg",
    alt: "Analytics dashboard"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="py-8 md:py-16 px-6 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          {/* Carousel Content */}
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            <div className="flex">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 flex flex-col lg:flex-row gap-8 items-center"
                  style={{ minWidth: '100%' }}
                >
                  <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                      <span className="text-adept">{slide.title}</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4 pt-4">
                      <Link to="/signup">
                        <Button size="lg" className="bg-adept hover:bg-adept-dark px-8 w-full sm:w-auto">
                          Try for Free
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto">
                          Book a Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <div className="rounded-lg overflow-hidden shadow-2xl glass-morphism">
                      <img 
                        src={slide.image} 
                        alt={slide.alt}
                        className="w-full aspect-[16/9] object-cover"
                        width="800"
                        height="450"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <button 
                onClick={goToPrevSlide}
                className="absolute left-2 lg:-left-8 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 shadow-md z-10"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={goToNextSlide}
                className="absolute right-2 lg:-right-8 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 shadow-md z-10"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </>
          )}
        </div>
        
        {/* Carousel Indicators */}
        <div className="mt-8">
          <CarouselIndicators 
            total={heroSlides.length} 
            current={currentSlide} 
            onClick={goToSlide}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
