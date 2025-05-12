
import { motion } from "framer-motion";
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const ProfessionalDevelopment = () => {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    courseLevel: "Bachelor's",
    courseInterest: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("access_key", "YOUR_ACCESS_KEY_HERE"); // Replace with Web3Forms API Key
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const result = await response.json();
    if (result.success) {
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "India",
        courseLevel: "Bachelor's",
        courseInterest: "",
        message: "",
      });
    } else {
      alert("Error submitting form. Please try again.");
    }
  };
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Professional Development
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empower professionals to manage and accelerate their career growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center order-2 md:order-1"
          >
            <h2 className="text-2xl font-bold mb-4">Career Growth Platform</h2>
            <p className="text-gray-600 mb-6">
            AdeptAI’s Professional Development Portal empowers healthcare professionals to take charge of their growth while helping organizations cultivate a highly skilled and engaged workforce.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Personalized learning paths",
                "Skill assessment and tracking",
                "Certification management",
                "Mentorship connections",
                "Career progression planning"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full sm:w-auto">Start Your Journey</Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-1 md:order-2"
          >
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-2 rounded-xl shadow-sm mb-6">
              <img 
                src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/02/Screenshot-2025-02-10-123045.png.webp" 
                alt="Professional Development Platform" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        <SectionHeading
          title="Platform Features"
          description="Tools to accelerate professional growth"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Learning Hub",
              description: "Access a curated library of courses, webinars, and resources for continuous learning.",
              icon: "📚"
            },
            {
              title: "Skill Tracking",
              description: "Document and showcase your growing skill set with verifiable credentials.",
              icon: "📋"
            },
            {
              title: "Goal Setting",
              description: "Set and track professional development goals with progress monitoring.",
              icon: "🎯"
            },
            {
              title: "Certification Management",
              description: "Keep all your professional certifications organized with renewal reminders.",
              icon: "🏆"
            },
            {
              title: "Mentor Matching",
              description: "Connect with mentors in your field for guidance and career advice.",
              icon: "👥"
            },
            {
              title: "Career Planning",
              description: "Visualize and plan your career path with personalized recommendations.",
              icon: "🚀"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        📱 Course Interest Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="border p-3 rounded-md w-full" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="border p-3 rounded-md w-full" />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="border p-3 rounded-md w-full" />
          <select name="country" value={formData.country} onChange={handleChange} className="border p-3 rounded-md w-full">
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>
        </div>

        <select name="courseLevel" value={formData.courseLevel} onChange={handleChange} className="border p-3 rounded-md w-full">
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>Diploma</option>
        </select>

        <div>
          <label className="font-medium text-gray-700">Course of Interest</label>
          <select name="courseInterest" value={formData.courseInterest} onChange={handleChange} required className="border p-3 rounded-md w-full mt-1">
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Select the course you're interested in pursuing</p>
        </div>

        <div>
          <label className="font-medium text-gray-700">Your Educational Goals</label>
          <textarea name="message" placeholder="Share your aspirations, timeline, and any specific requirements..." value={formData.message} onChange={handleChange} required className="border p-3 rounded-md w-full mt-1"></textarea>
        </div>

        <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-md flex items-center gap-2 w-full justify-center">
          🚀 Submit Query
        </button>
      </form>
    </div>

    </div>
  );
};

export default ProfessionalDevelopment;
