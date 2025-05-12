import { motion } from "framer-motion";
import { ChartBar, GraduationCap, BrainCircuit, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import im1 from "./img/prof1.webp"
import im2 from "./img/ai-driven.jpg"
import im3 from "./img/anaytical suite.jpg"
import im4 from "./img/compliance management.jpg"

const FeatureHighlights = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Driven Matchmaking",
      description: "Redefines recruitment with precision and innovation through cutting-edge algorithms.",
      image: im2,
      color: "from-purple-500/20 to-indigo-500/20",
      link: "/talent"
    },
    {
      icon: FileCheck,
      title: "Compliance Management",
      description: "Automates and simplifies credentialing and compliance processes with intelligent tools.",
      image: im4,
      color: "from-amber-500/20 to-orange-500/20",
      link: "/compliance"
    },
    {
      icon: ChartBar,
      title: "Analytics Suite",
      description: "Provides intelligence for proactive decision-making in workforce management.",
      image: im3,
      color: "from-blue-500/20 to-cyan-500/20",
      link: "/analytics"
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Empowers professionals to manage their growth and continuing education.",
      image: im1,
      color: "from-green-500/20 to-emerald-500/20",
      link: "/professional-development"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Platform Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Feature Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the powerful features that make AdeptAIPro the leading platform for AI-driven business transformation.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-10 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-primary font-medium hover:underline inline-flex items-center">
                    Learn more <span className="ml-1">→</span>
                  </Link>
              </div>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
