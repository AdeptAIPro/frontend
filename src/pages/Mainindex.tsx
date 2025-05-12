import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import im1 from './7094814.jpg'
import Chatbot from "@/components/chatbot/Chatbot";
import CTASection from "@/components/CTASection";
import { 
  ArrowRight, 
  BrainCircuit, 
  ChartBar, 
  Check, 
  CloudCog, 
  Code, 
  Database,
  Layers, 
  Lock, 
  MessageSquare, 
  PanelRight, 
  UserCheck, 
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import SolutionsOverview from "@/components/home/SolutionsOverview";
import ServiceSteps from "@/components/home/ServiceSteps";
import AIPoweredRecruitment from "@/components/home/AIPoweredRecruitment";
import MissionVision from "@/components/home/MissionVision";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureWidget from "@/components/crm/LeadCaptureWidget";
import TryForFreePopup from "./Form";
import { useState, useEffect } from "react";
import TalentMatchmakingPreview from "@/components/TalentMatchmakingPreview";

const Index1 = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <><Navbar/>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="">
               
                <h1 className="text-4xl mt-6 md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Workforce Intelligence Platform
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                AdeptAIPro is a next-generation, enterprise-ready Workforce Intelligence Platform engineered to redefine Talent Acquisition and Workforce Management to deliver a seamless, intelligent, and scalable hiring experience for organizations worldwide.
</p>
              </div>

              <div className="flex  flex-col sm:flex-row gap-4">
<TryForFreePopup/>
                <Link to="/login">
                <Button size="lg" variant="outline">
                  Book a Demo
                </Button></Link>
              </div>

              
            </div>

            <div className="relative w-auto mt-10">
  <div className="absolute -inset-0.5  bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30  animate-pulse"></div>
  <div className="relative bg-background rounded-lg shadow-xl overflow-hidden border">
    <img src={im1} margin-top="50px" alt="AI Dashboard" className="w-full object-contain h-auto" />
  </div>
</div>

          </div>
        </div>
      </section>
      {/* New Sections */}
      <SolutionsOverview />
      <TalentMatchmakingPreview/>
      <ServiceSteps />
      <AIPoweredRecruitment />
      <MissionVision />
      <FeatureHighlights />
      {/* How It Works Section */}
    <Chatbot/>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Client Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what businesses like yours have achieved with AdeptAIPro."
          />
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                quote: "Implementing AdeptAIPro's predictive analytics has transformed our inventory management, reducing costs by 35% and improving fulfillment times.",
                author: "Sarah Johnson",
                role: "VP Operations",
                company: "Global Retail Inc."
              },
              {
                quote: "The natural language processing capabilities have revolutionized our customer service. Response times are down 60% while satisfaction scores are up 40%.",
                author: "Michael Chen",
                role: "CTO",
                company: "TechSolutions Ltd"
              },
              {
                quote: " AdeptAIPro helped us process years of unstructured data to uncover insights we never knew existed. It's been a game-changer for our strategy.",
                author: "Emma Rodriguez",
                role: "Data Director",
                company: "FinServe Group"
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integrations Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Seamless Connectivity"
            title="Integrate with Your Favorite Tools"
            description="AdeptAIPro connects seamlessly with the tools and platforms you already use."
          />
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
          
          <div className="w-60 p-4 h-24  rounded-lg shadow-sm flex items-center justify-center">
          <div className="w-full h-full bg-gray-350 rounded flex items-center justify-center">
            <img src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/03/LI-Logo-768x187.png.webp" alt="im1" />
          </div>
          </div>
          <div className="w-60 p-3 h-24 rounded-lg shadow-sm flex items-center justify-center ">
          <div className="w-full h-full bg-gray-350 rounded flex items-center justify-center">
           <img src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads//2025/03/ceipal-logo.svg" alt="" />
          </div>
          </div>
          </motion.div>

          
          <div className="text-center mt-12">
            <Link to="/integrations">
              <Button variant="outline" size="lg" className="group">
                View All Integrations
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to Transform Your Business with AI?"
        description="Join hundreds of forward-thinking companies already leveraging our AI solutions."
        primaryButtonText="Get Started"
        primaryButtonLink="/contact"
        secondaryButtonText="Book a Demo"
        secondaryButtonLink="/contact"
        background="gradient"
      />
    </div>
    <Footer/>
    <LeadCaptureWidget/>

    </>
  );
};

export default Index1;
