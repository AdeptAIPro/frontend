
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/button';
import { ArrowRight } from "lucide-react";
import Footer from '@/components/Footer';

export default function Machinelearning() {
  return (<>
      <Navbar/>
    <div className="min-h-screen flex flex-col mt-20 bg-[#f4f4f4]">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500 bg-opacity-30 text-sm font-medium mb-4">
                Sales Team • New Position
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sales Associate</h1>
              {/* <p className="text-xl md:text-2xl text-blue-100 mb-6">IT & AI Consulting Solutions</p> */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Remote, India</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span>Full-time</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
            
   {/* Job Description */}
   <div className="bg-white rounded-xl shadow-sm p-10 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                We are looking for a talented and motivated Machine Learning Engineer to join our team and contribute to the design, development, and deployment of advanced machine learning models and systems. In this role, you will work on implementing cutting-edge algorithms and optimizing them for real-world applications across various industries. You will collaborate with data scientists, software engineers, and product teams to develop robust, scalable, and efficient ML solutions that solve complex business challenges.

As a Machine Learning Engineer, you will play a critical role in shaping our AI-driven products and systems by translating research models into production-ready solutions that drive measurable impact </p>
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Key Responsibilities:</h3>
                  <p><b>Cold Calling and Sales Associate Duties:</b></p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Cold Calling: Initiate and manage outbound calls to prospective clients, introducing them to our AI consulting and staffing services.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
Design, implement, and deploy machine learning models and algorithms to solve business problems and improve decision-making processes.
                      </span>
                    </li> <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Collaborate with data scientists to develop models using various techniques such as supervised, unsupervised, and reinforcement learning.
                      </span>
                    </li> <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Optimize machine learning algorithms for speed, efficiency, and scalability in real-world applications.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Build and maintain end-to-end machine learning pipelines, from data preprocessing and model training to deployment and monitoring.</span> 
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Conduct experiments to evaluate the performance of different models and continuously improve them based on results.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Work with large datasets, applying data cleaning, feature engineering, and transformation techniques to prepare data for model building.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Collaborate with cross-functional teams, including software engineers and product managers, to integrate machine learning models into production systems and products.
</span>                    </li>
<li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Implement continuous integration/continuous deployment (CI/CD) processes for machine learning models.

</span>                    </li> <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Stay up-to-date with the latest trends, techniques, and best practices in machine learning and AI.

</span>                    </li>
                    
                    
                  </ul>
                </div>
                 <div className="mt-6 space-y-4">
                  <p><b>Executive Chief of Staff Duties:</b></p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Strategic Planning: Collaborate with senior leadership to develop and execute organizational strategies, ensuring alignment with business objectives.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Process Optimization: Identify inefficiencies in workflows and implement solutions to streamline operations across departments.
                      </span>
                    </li> <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Cross-Functional Coordination: Act as a liaison between teams to facilitate communication, align goals, and ensure successful execution of projects
                      </span>
                    </li> <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                      Meeting Preparation: Organize and facilitate leadership meetings, including preparing agendas, summarizing key takeaways, and driving follow-up actions.
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Executive Support: Assist senior leaders with decision-making by conducting research, gathering data, and preparing reports or presentations.</span>
                    </li>
                   
                    
                    
                  </ul>
                </div>
              </div>
             

             
               {/* Preferred Qualifications */}
         <div className="bg-white rounded-xl shadow-sm p-10 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Preferred Qualifications</h2>
                <div className="grid ">
                  <div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Proven experience in cold calling, telemarketing, or inside sales, preferably in IT consulting or a related field.</span>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>
                        Stock                        </span>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Competitive salaries
                        </span>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Quarterly employee travel coupon
                        </span>
                      </li><li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Paid time off
                        </span>
                      </li><li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Medical, dental, & vision insurance
                        </span>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Life insurance and disability benefits
                        </span>
                      </li>
                      <li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Fitness Discounts

                        </span>
                      </li><li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>401K with matching

                        </span>
                      </li><li className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Flexible Spending Accounts

                        </span>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </div>

         
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply CTA */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
                <h2 className="text-xl font-bold mb-3">Ready to Apply?</h2>
                <p className="mb-4">Join our team and help shape the future of AI-driven business solutions.</p>
                <Link to="/apply">  <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition duration-150 ease-in-out flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  Apply Now
                </button></Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      
                    </div>
                    <div className="ml-4">
                      <p className="mt-1 text-gray-600">
                      Opportunity to work in a fast-paced, innovative industry.

                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                     
                    </div>
                    <div className="ml-4">
                      <p className="mt-1 text-gray-600">
                      Competitive salary with performance-based incentives and bonuses.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                     
                    </div>
                    <div className="ml-4">
                      <p className="mt-1 text-gray-600">
                        Professional development and growth opportunities within the organization.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      
                    </div>
                    <div className="ml-4">
                      <p className="mt-1 text-gray-600">
                      Collaborative and supportive team environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Jobs</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Link to="/careers/full-stack-engineer">  <h3 className="font-medium text-gray-900">Full Stack Engineer</h3>
                    <p className="text-sm text-gray-600 mt-1"> Remote • Full-time</p></Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Link to="/careers/full-stack-web-developer-java-technologies-ai-saas-platform/">  <h3 className="font-medium text-gray-900">Full Stack Web Developer – AI SaaS Platform</h3>
                    <p className="text-sm text-gray-600 mt-1">Remote • Full-time</p></Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Link to="/careers/machine-learning-engineer/">  <h3 className="font-medium text-gray-900">Machine learning engineer</h3>
                    <p className="text-sm text-gray-600 mt-1">Remote • Full-time</p></Link>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/career" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                    View all open positions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" x2="19" y1="12" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
  {/* How to Apply */}
  <div className="bg-white rounded-xl shadow-sm p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                Interested candidates should submit their resume and a brief cover letter highlighting their relevant experience and why they’re interested in this role.
                </p>
               
                <Link to="/apply"> <Button> Apply now</Button></Link>

                
              </div>
            </div>
          </div>
        </div>
        
      
                 
        


      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More Opportunities</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover other exciting roles and opportunities to join our innovative team.
            </p>
            <a 
              href="/career" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#007BFF] hover:bg-[#0056b3] transition duration-150 ease-in-out"
            >
              View All Career Opportunities
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" x2="19" y1="12" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      </main>
    </div>
    <Footer/></>
  )
}