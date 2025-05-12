
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  FileCheck, 
  ChartBar, 
  GraduationCap
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const SolutionsOverview = () => {
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

  const solutions = [
    {
      icon: BrainCircuit,
      title: "AI-driven Matchmaking",
      description: "Match candidates to positions with unparalleled precision using our advanced neural networks and machine learning algorithms."
    },
    {
      icon: FileCheck,
      title: "Automated Compliance Management",
      description: "Streamline credentialing, licensing, and regulatory compliance with intelligent document processing and verification."
    },
    {
      icon: ChartBar,
      title: "Predictive Analytics",
      description: "Leverage data-driven insights to forecast staffing needs, identify trends, and optimize workforce management strategies."
    },
    {
      icon: GraduationCap,
      title: "Professional Development Portal",
      description: "Empower professionals with personalized learning paths, skill tracking, and certification management tools."
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
              Comprehensive Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Solutions Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AdeptAIPro is an advanced AI-powered Workforce Management Platform designed to transform the entire Talent Acquisition process. By leveraging cutting-edge AI automation, it streamlines recruitment, enhances efficiency, and ensures precise candidate-job matchmaking. From sourcing to hiring, AdeptAIPro optimizes workforce management, reducing time-to-hire and improving hiring accuracy for business of all sizes.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={fadeIn}>
              <FeatureCard
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsOverview;
