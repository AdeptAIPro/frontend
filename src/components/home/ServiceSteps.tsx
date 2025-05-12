
import { motion } from "framer-motion";
import { UserPlus, Settings, Link } from "lucide-react";

const ServiceSteps = () => {
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

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up for an Account",
      description: "Quick account creation in minutes with a simple, user-friendly registration process."
    },
    {
      icon: Settings,
      title: "Customize Your Dashboard",
      description: "Personalize your user interface with widgets and tools that matter most to your workflow."
    },
    {
      icon: Link,
      title: "Integrate Your Favorite Tools",
      description: "Connect seamlessly with your existing applications and systems for a unified experience."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Simple Onboarding
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Service Transformation Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get started with AdeptAIPro in just three simple steps and transform how your business operates.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="inline-block w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSteps;
