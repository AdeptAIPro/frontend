
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import Navbar  from "../Navbar";
import Footer from "../Footer";
const AnalyticsSuite = () => {
  return (
    <><Navbar/>
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Analytics Suite
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Powerful intelligence for proactive decision-making in workforce management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-xl shadow-sm mb-6">
              <img 
                src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/02/Screenshot-2025-02-10-190417.png.webp" 
                alt="Analytics Dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4">Data-Driven Decisions</h2>
            <p className="text-gray-600 mb-6">
            AdeptAI’s Analytics Suite is designed to provide healthcare organizations with the intelligence they need to make proactive, informed decisions about workforce management and strategic planning.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Real-time performance analytics",
                "Predictive workforce modeling",
                "Custom reporting dashboards",
                "Trend identification and analysis",
                "Benchmarking against industry standards"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-purple-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full sm:w-auto">Explore Analytics</Button>
          </motion.div>
        </div>

        <SectionHeading
          title="Analytics Capabilities"
          subtitle="Transform your data into strategic insights"
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: "Performance Metrics",
              description: "Track individual and team performance with customizable KPIs.",
              icon: "📊"
            },
            {
              title: "Retention Analysis",
              description: "Identify factors affecting employee retention and take proactive measures.",
              icon: "🔄"
            },
            {
              title: "Workforce Planning",
              description: "Model future workforce needs based on growth projections and market trends.",
              icon: "📅"
            },
            {
              title: "Cost Optimization",
              description: "Analyze labor costs and identify opportunities for optimization.",
              icon: "💰"
            },
            {
              title: "Skill Gap Analysis",
              description: "Identify skill gaps and develop targeted training programs.",
              icon: "🧩"
            },
            {
              title: "Recruitment Analytics",
              description: "Measure recruitment effectiveness and optimize hiring processes.",
              icon: "🎯"
            },
            {
              title: "Predictive Insights",
              description: "Anticipate future trends and challenges with AI-powered predictions.",
              icon: "🔮"
            },
            {
              title: "Custom Reporting",
              description: "Create tailored reports and dashboards for different stakeholders.",
              icon: "📈"
            }
          ].map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{capability.icon}</div>
              <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
              <p className="text-gray-600">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AnalyticsSuite;
