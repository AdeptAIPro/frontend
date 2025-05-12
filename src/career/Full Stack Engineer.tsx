import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/button';
import { ArrowRight } from "lucide-react";
import Footer from '@/components/Footer';

export default function FullStackEngineer() {
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
              Full Stack Engineer • New Position
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Full Stack Engineer</h1>
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
                We are seeking an experienced Full Stack Engineer with expertise in Frontend and Backend technologies to join our team and contribute to the development of a cutting-edge AI-powered SaaS platform. In this role, you will be responsible for designing, building, and maintaining both the front-end and back-end of a dynamic, scalable, and high-performance platform that delivers AI-driven solutions to our clients.

As a key member of the development team, you will work with the latest technologies and frameworks to create innovative solutions that enhance user experience and provide seamless integration with AI models and services. You will be involved in all stages of software development, from initial planning to deployment, and will collaborate closely with data scientists, UX/UI designers, and product teams to ensure the platform meets business needs.
                   </p>
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Key Responsibilities:</h3>
                  <p><b>Frontend Development
                  </b></p>
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
                      <span>Advanced proficiency in TypeScript and JavaScript.

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
                      <span>Practical experience developing with React.js (preferred) or Vue.js.
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
                      In-depth knowledge of component-based architecture and state management libraries (e.g., Redux or Vuex).
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
                      <span>Hands-on experience with modern design systems like Tailwind CSS or Ant Design.
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
                      <span>Expertise in Next.js or Nuxt.js for server-side rendering and dynamic routing.
                      </span>
                    </li>
                   
                    
                    
                  </ul>
                </div>
                <div className="mt-6 space-y-4">
                  <p><b>Backend Development
                  </b></p>
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
                      <span>Extensive experience with Node.js, leveraging frameworks such as Express.js or NestJS for scalable backend solutions.


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
                      <span>Proven ability to design, build, and consume RESTful APIs and/or GraphQL APIs with a focus on best practices and efficiency.

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
                      Familiarity with authentication mechanisms such as OAuth2, OpenID Connect, and session management practices.
                      </span>
                    </li> 
                 
                   
                    
                    
                  </ul>
                </div> <div className="mt-6 space-y-4">
                  <p><b>Database Management

                  </b></p>
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
                      <span>Deep understanding of relational databases like PostgreSQL, including schema design, indexing, and query optimization.


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
                      <span>Proficiency with NoSQL databases like MongoDB, including aggregation pipelines and scalability considerations.

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
                      Experience with database migrations and version control tools (e.g., Liquibase, Flyway).
                      </span>
                    </li>                 
                    
                  </ul>
                </div> <div className="mt-6 space-y-4">
                  <p><b>DevOps and Deployment

                  </b></p>
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
                      <span>Strong command of Git and Git-based workflows (e.g., feature branching, pull requests).
                      .

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
                      <span>Experience with containerization using Docker, including multi-stage builds and orchestration tools like Kubernetes (preferred).

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
                      Practical knowledge of cloud platforms like AWS, Google Cloud, or Azure, including core services (e.g., EC2, S3, Cloud Functions).

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
                      <span>Expertise in setting up and maintaining CI/CD pipelines using tools like GitHub Actions, GitLab CI, or Jenkins.

                      </span>
                    </li>
                    
                   
                    
                    
                  </ul>
                </div> <div className="mt-6 space-y-4">
                  <p><b>Testing and Quality Assurance

                  </b></p>
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
                      <span>Proficiency with testing frameworks such as Jest, Cypress, or Mocha, and experience implementing automated testing pipelines.


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
                      <span>Expertise in writing unit, integration, and end-to-end (E2E) tests with a focus on test-driven development (TDD) or behavior-driven development (BDD).

                      </span>
                    </li> 
                   
                   
                    
                    
                  </ul>
                </div> <div className="mt-6 space-y-4">
                  <p><b>Additional Technical Skills

                  </b></p>
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
                      <span>Familiarity with data visualization tools like Metabase, Tableau, or Power BI.


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
                      <span>Experience implementing secure API authentication using OAuth, JWT, or similar technologies.

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
                      Knowledge of performance monitoring and logging tools such as New Relic, Elastic Stack, or Datadog.

                      </span>
                    </li> 
                    
                   
                    
                    
                  </ul>
                </div>
                 <div className="mt-6 space-y-4">
                  <p><b>Soft Skills

                  </b></p>
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
                      <span>Exceptional analytical and debugging skills for solving complex technical challenges.

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
                      <span>Effective communication and ability to convey technical concepts to non-technical stakeholders.
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
                      <span>Strong adaptability to rapidly evolving technologies and tools.
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
                      <span>Proven ability to collaborate in cross-functional, agile teams.

                      </span>
                    </li>                  
                    
                  </ul>
                </div>
                <div className="mt-6 space-y-4">
                  <p><b>Education & Experience


                  </b></p>
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
                      <span>Bachelor's degree in Computer Science, Software Engineering, or a related field (or equivalent practical experience).


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
                      <span>A minimum of 3 years of hands-on experience in full stack development or related disciplines.

                      </span>
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
                        <span>Demonstrated experience in fast-paced startup or agile environments.
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
                        Active contributions to open-source projects or a well-maintained GitHub portfolio showcasing past projects.
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
                        <span>Expertise in architecting and maintaining highly scalable, fault-tolerant systems.
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
                <Link to="/apply">   <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition duration-150 ease-in-out flex items-center justify-center">
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
              href="/career
              " 
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