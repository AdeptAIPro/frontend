
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import Navbar from "../Navbar";
import Footer from "../Footer";
const ComplianceManagement = () => {
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
            Compliance Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Automate and simplify credentialing and compliance processes with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center order-2 md:order-1"
          >
            <h2 className="text-2xl font-bold mb-4">Effortless Compliance</h2>
            <p className="text-gray-600 mb-6">
            AdeptAI’s Compliance Management System is a robust solution that automates and simplifies the intricacies of credentialing and compliance, allowing healthcare organizations to operate with peace of mind.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Automated credential verification",
                "Real-time compliance monitoring",
                "Regulatory update notifications",
                "Audit-ready documentation",
                "Customizable compliance workflows"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full sm:w-auto">Get Started</Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-1 md:order-2"
          >
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl shadow-sm mb-6">
              <img 
                src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/02/Screenshot-2025-02-10-123023.png.webp" 
                alt="Compliance Management Dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        <SectionHeading
          title="Key Benefits"
          subtitle="Transform your compliance processes with automation"
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Risk Reduction",
              description: "Minimize compliance risks with proactive monitoring and alerts for potential issues.",
              icon: "🛡️"
            },
            {
              title: "Time Savings",
              description: "Reduce administrative burden with automated verification and documentation.",
              icon: "⏱️"
            },
            {
              title: "Regulatory Updates",
              description: "Stay current with automatic updates when regulations change in your industry.",
              icon: "📝"
            },
            {
              title: "Centralized Records",
              description: "Maintain all compliance records in one secure, easily accessible location.",
              icon: "📂"
            },
            {
              title: "Audit Readiness",
              description: "Generate comprehensive reports instantly when audits arise.",
              icon: "✅"
            },
            {
              title: "Scalable Solution",
              description: "Easily scale your compliance processes as your organization grows.",
              icon: "📈"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>  );
};

export default ComplianceManagement;
