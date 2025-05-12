
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroGradient = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-neural-pattern opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/30 z-0"></div>
      
      <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
              <span className="mr-1 animate-pulse">✨</span> 
              <span>Innovative Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Transform
              </span>{" "}
              Your Business with Advanced AI
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Discover new opportunities and overcome challenges with our cutting-edge 
              artificial intelligence solutions designed specifically for your industry.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-white shadow-lg shadow-indigo-500/20"
              >
                Schedule Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-indigo-200 hover:bg-indigo-50 text-indigo-700"
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-6 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${
                      i === 1 ? "from-pink-400 to-pink-600" :
                      i === 2 ? "from-blue-400 to-blue-600" :
                      i === 3 ? "from-green-400 to-green-600" :
                      "from-purple-400 to-purple-600"
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-600">Join 10,000+ companies</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "AI-Powered Analytics", icon: "📊" },
                  { title: "Process Automation", icon: "⚙️" },
                  { title: "Smart Integrations", icon: "🔌" },
                  { title: "Predictive Insights", icon: "🔮" }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h3 className="font-medium">{feature.title}</h3>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-sm">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-sm">Free 14-day trial</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroGradient;
