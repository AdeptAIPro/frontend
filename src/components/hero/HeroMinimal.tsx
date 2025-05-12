
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroMinimal = () => {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
            A better way to work
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight">
            Get more done with less effort
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our intuitive platform helps teams collaborate seamlessly, automate routine tasks, 
            and focus on what truly matters.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
            >
              Try it free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Watch demo
            </Button>
          </div>
          
          <div className="pt-12">
            <div className="flex justify-center space-x-8">
              {["Spotify", "Microsoft", "Airbnb", "Uber"].map((brand, i) => (
                <div key={i} className="text-gray-400 font-semibold text-sm md:text-base">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-gray-100 p-2 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://via.placeholder.com/1200x600" 
              alt="Platform Interface" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroMinimal;
