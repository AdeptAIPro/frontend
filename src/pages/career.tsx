
import { ChevronRight, MapPin, Clock, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CareersPage() {
  const jobs = [
    {
      id: "sales-associate-it-consulting-ai-consulting-services/",
      title: "Sales Associate – IT Consulting (AI Consulting Services)",
      description: "Results-driven Sales Associate to join our dynamic IT Consulting team for promoting our AI consulting services.",
      salary: "$5-$10/Hour",
      type: "Full-Time",
      location: "Remote",
      bgColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "full-stack-engineer",
      title: "Full Stack Engineer",
      description: "Full Stack Engineer with expertise in Frontend and Backend technologies with AI based Platform experience.",
      salary: "$5-$10/Hour",
      type: "Full-Time",
      location: "Remote",
      bgColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "full-stack-web-developer-java-technologies-ai-saas-platform/",
      title: "Full Stack Web Developer – AI SaaS Platform",
      description: "Full Stack Web Developer with expertise in Java technologies contribute to the development of a cutting-edge AI-powere.",
      salary: "$15-20,000/Annum",
      type: "Full-Time",
      location: "Remote, India",
      bgColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "machine-learning-engineer/",
      title: "Machine learning engineer",
      description: "Designing and implementing machine learning models and systems, and optimizing algorithms for real-world applications",
      salary: "$20-25,000/Annum",
      type: "Full-Time",
      location: "Remote, India",
      bgColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "ai-research-scientist",
      title: "AI Research Scientist",
      description: "Conducting cutting-edge research in AI, developing new algorithms, and pushing the boundaries of AI capabilities.",
      salary: "$25-$40/Hour",
      type: "Full-Time",
      location: "Remote, India",
      bgColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <><Navbar/>
    <div className="min-h-screen mt-20 bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 mt-8 text-white">
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>
        </div>
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Join Our Team</h1>
            <p className="mt-6 text-xl">Discover opportunities to grow, innovate, and make an impact with us.</p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Open Positions</h2>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {job.type}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${job.bgColor}`}>
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="mr-1.5 h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="mr-1.5 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                 
                  <Button asChild className="mt-4 sm:mt-0 sm:ml-6 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                    <Link to={`/careers/${job.id}`}>
                      Explore More
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}