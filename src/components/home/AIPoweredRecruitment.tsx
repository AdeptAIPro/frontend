
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, Database, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AIPoweredRecruitment = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Recruitment Revolution
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              AI-Powered Recruitment
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our platform utilizes advanced artificial intelligence to match candidates with the perfect positions, analyzing skills, experience, and cultural fit with unprecedented accuracy.
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: UserCheck,
                  title: "Precision Matching",
                  description: "Match candidates to positions based on skills, experience, and cultural fit."
                },
                {
                  icon: Database,
                  title: "HR & Payroll Integration",
                  description: "Seamless connection with your existing HR and payroll systems."
                },
                {
                  icon: Zap,
                  title: "Enhanced Efficiency",
                  description: "Reduce time-to-hire and improve compliance processes."
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/talent">
              <Button size="lg" className="group">
                Explore Recruitment Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, delay: 0.2 }
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80" 
                alt="AI-Powered Recruitment" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-white/80 text-sm mb-2">Powered by AdeptAIPro</span>
                <h3 className="text-white text-xl font-bold">Next-Generation Talent Matching</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIPoweredRecruitment;
