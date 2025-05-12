
import { motion } from "framer-motion";

const MissionVision = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/20 text-white">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Mission and Vision
            </h2>
            
            <div className="mb-12 space-y-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-white/90">
                AdeptAIPro is committed to empowering businesses with AI-driven insights and automation, 
                  transforming how organizations operate and make decisions in an increasingly complex world.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-white/90">
                  To be the global leader in AI-powered business transformation, creating a future where 
                  artificial intelligence enhances human potential and drives unprecedented growth and innovation.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { number: "10M+", label: "Data Points Processed Daily" },
                { number: "96%", label: "Client Satisfaction Rate" },
                { number: "40%", label: "Average Efficiency Increase" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-display font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
