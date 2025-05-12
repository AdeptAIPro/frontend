
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSplit = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
              <span className="mr-1">🚀</span> 
              <span>Accelerate Your Growth</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
              Simplify Complex Business Operations
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Our platform streamlines workflows, optimizes resource allocation, and provides real-time insights to help your business scale efficiently.
            </p>
            
            <div className="space-y-4">
              {[
                "Reduce operational costs by 35%",
                "Save 15+ hours per week on administrative tasks",
                "Improve team productivity by 40%"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 text-white"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-amber-200 hover:bg-amber-50 text-amber-700"
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
          
          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full"
          >
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-1 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://via.placeholder.com/600x500" 
                alt="Platform Dashboard" 
                className="w-full h-auto rounded-xl"
              />
              
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -right-6 -bottom-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <div className="text-green-600 text-xl">↑</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Performance</div>
                    <div className="text-lg font-semibold">+45%</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -left-6 top-10 bg-white p-4 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <div className="text-blue-600 text-xl">★</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">User Rating</div>
                    <div className="text-lg font-semibold">4.9/5</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
