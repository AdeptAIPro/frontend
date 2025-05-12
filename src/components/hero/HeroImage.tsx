
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroImage = () => {
  return (
    <section className="min-h-[90vh] relative flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://via.placeholder.com/1920x1080"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
      </div>
      
      <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
              <span className="mr-1">💡</span> 
              <span>Revolutionary Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight">
              The Future of 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 ml-2">
                Enterprise Solutions
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-xl">
              Empower your organization with next-generation tools designed to elevate performance, enhance collaboration, and drive growth.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 transition-all duration-300"
              >
                Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 hover:bg-white/10 text-white"
              >
                Contact Sales
              </Button>
            </div>
            
            <div className="pt-10">
              <div className="text-sm text-white/60 mb-3">TRUSTED BY INDUSTRY LEADERS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center">
                    <div className="text-white">Logo {i}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
