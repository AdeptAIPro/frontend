import { useState } from "react";
import { useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const teamMembers = [
   {
      name: "Abhishek Mathur ",
      role: "CEO/CTO",
      mail:"abhi@adeptaipro.com",
      bio: "Abhishek Mathur is a seasoned entrepreneur and recognized industry leader with over 20+ years of experience in the U.S. and India, specializing in healthcare, IT, non-IT solutions, and workforce management. A second-time founder, he brings deep expertise in AI-driven workforce transformation, solution sales, and M&A strategies.With a proven track record across startups and enterprise firms, Abhishek’s leadership spans HR, Finance, Compliance, Legal, Delivery, and Sales, ensuring operational excellence and business growth.As the visionary behind AdeptAIPro, he is redefining hiring efficiency through advanced AI solutions, automating compliance, and optimizing talent-job matching. Under his leadership, AdeptAIPro is poised to disrupt the $500B+ workforce industry, empowering organizations to hire smarter, faster, and at scale.",
      image: "https://media.licdn.com/dms/image/v2/D5603AQH17hKVQLG0WA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1700089015269?e=1747872000&v=beta&t=pGd8z70C9tS6ZaynBi9iS7yFUWWzCY2ZpBudjMc5tVU",
    },
    {
      name: "Prateek Mathur",
      role: "Board of Advisor - Saas",
      mail:"Prateek@adeptaipro.com ",
      bio: "Prateek Mathur founded Saaskart to transform how businesses discover and manage software. With a background in IT outsourcing and growth marketing from his previous venture, ET Solutions, Prateek brought deep industry insights to Saaskart, now India’s leading B2B SaaS + Services marketplace platform.His focus on simplifying buying and management has led to partnerships with 10,000+ software companies. Under Prateek’s leadership, Saaskart continues to offer businesses an efficient and personalized approach to managing their software needs..",
      image: "https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/03/Screenshot-2025-03-01-163958-600x609.png",
    },
    {
      name: "Chandra Shekhar ",
      role: "Board of Advisor - Professional Development",
      mail:"chandra.shekhar@adeptaipro.com",
      bio: "Mr. Chandra Shekhar Rajora is currently working as an Associate Professor at the Department of Electronics and Communication, School of Engineering and Technology, Jaipur National University, Jaipur, Rajasthan, India. He completed his B.E. in Electronics and Communication Engineering from University of Rajasthan, Jaipur, he obtained his M.Tech in Digital Communication Engineering and MBA (HR & MKTG.) from Rajasthan Technical University, Kota, Rajasthan, India. He is currently pursuing his Ph.D. in Electronics and Communication specialization in Design and development of MIMO Antenna for different configurations. He is having teaching experience of more than 18 years at different universities of good repute. He is Life time member of Indian Society of technical Education. He has published many research papers/Articles in international journals indexed in SCOPUS/IEEE/ELSEVIER.He also authored many books and book chapters.His special fields of interest are MIMO Antenna, Optical Fiber Communication Systems, VLSI design, Entrepreneurship Development, Business Ethics and Organizational Behaviour.s",
      image: "https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-20-at-11.42.10_62c5921e.jpg",
    },
    {
      name: "Rushi Shahiwala",
      role: "Board of Advisor - HealthTech",
      mail:"rushi@adeptaipro.com",
      bio: "Rushi Shahiwala is a board certified Orthopedic physical therapist and a Director of Texas Star Rehab and Sports Performance Center. He has been involved with a healing of hundreds of people including pro athletes in Canada and USA for more than 21 years.Rushi has been training and treating various pro athletes and Olympians in all sports for many years including world class Boxers, UFC fighters, Golfers, Cricketers, Tennis Players, NBA and NFL players, Fencers, Athletes, Swimmers , Ice hockey players on top of treating all patients for pain, trauma, post op rehab etc.",
      image: "https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/03/Screenshot-2025-03-01-164027.png",
    },
    {
      name: "Shital Bhamare",
      role: "Human Resource Manager",
      mail:"shital@adeptaipro.com",
      bio: "Shital specializes in sourcing, screening, and onboarding top-tier technical talent. A strategic thinker and skilled communicator, Shital excels at leveraging recruitment platforms, networking, and data-driven hiring practices to identify candidates who align with both technical requirements and organizational culture.Passionate about building high-performing teams, Shital is committed to creating a seamless and positive hiring experience for both candidates and stakeholders. By staying attuned to industry trends and fostering meaningful relationships, she ensures the recruitment process drives business success and enhances employee satisfaction",
      image: "https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/03/Screenshot-2025-03-01-164048-600x674.png",
    },
  ];

  

  return (
    <><Navbar/>
    <div className="pt-28  -mt-10 ">
      {/* Hero Section */}
      <section className="py-20  bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Our Story
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl font-display font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 },
                },
              }}
            >
              About AdeptAIPro
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4 },
                },
              }}
            >
              We're on a mission to make artificial intelligence accessible,
              practical, and transformative for businesses worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At AdeptAIPro, our mission is to democratize artificial intelligence
                by creating powerful, intuitive AI solutions that solve real business
                challenges across industries. We believe that AI should be accessible
                to companies of all sizes, not just tech giants with unlimited resources.
              </p>
              <p className="text-lg text-muted-foreground">
                We're committed to developing ethical AI systems that augment human
                capabilities rather than replace them, fostering a future where
                humans and AI work together to achieve remarkable outcomes.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-xl transform rotate-3 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Team collaboration"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mt-24">
            <motion.div
              className="relative md:order-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-xl transform -rotate-3 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                alt="Future vision"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              className="md:order-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We envision a world where AI enhances every aspect of business
                operations, from decision-making to customer experiences. Our goal
                is to be at the forefront of this transformation, creating AI
                solutions that are not just powerful but also transparent,
                trustworthy, and aligned with human values.
              </p>
              <p className="text-lg text-muted-foreground">
                By 2030, we aim to help over 10,000 organizations worldwide leverage
                the power of AI to solve their most complex challenges, driving
                innovation and creating value across industries and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

<section className="py-20 bg-muted">
  <div className="container mx-auto px-4">
    <SectionHeading
      eyebrow="Leadership"
      title="Meet Our Team"
      description="The passionate experts behind AdeptAIPro's innovation and success."
    />

    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {teamMembers.map((member, index) => {
        const [expanded, setExpanded] = useState(false);

        return (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={fadeIn}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
              <p className="text-primary text-sm font-medium mb-4">{member.mail}</p>

              
              {/* Truncated Bio with Toggle */}
              <p className="text-muted-foreground text-sm">
                {expanded ? member.bio : member.bio.slice(0, 160) + "..."}
              </p>

              <button
  className="mt-2 text-[black] font-medium hover:text-[#4a0fb8] transition-colors duration-300"
  onClick={() => setExpanded(!expanded)}
>
  {expanded ? "View Less" : "View More"}
</button>

            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</section>


      {/* Company Timeline */}
    
      

      {/* CTA Section */}
      <CTASection
        title="Join Our Team"
        description="We're always looking for talented individuals who share our passion for AI and innovation."
        primaryButtonText="View Careers"
        primaryButtonLink="/career"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
        background="light"
      />
    </div>
    <Footer/>
    </>
  );
};

export default About;
