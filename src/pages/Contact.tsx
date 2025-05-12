
import { useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building,
  Mail, 
  MapPin, 
  Phone
} from "lucide-react";

const Contact = () => {
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

  return (
    <><Navbar/>
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 -mt-10 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Get In Touch
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
              Contact Us
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
              Have questions about our products or services? We're here to help.
              Reach out to our team and we'll get back to you shortly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16">
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form 
  action="https://api.web3forms.com/submit" 
  method="POST"
  className="space-y-6"
>
  {/* Add your Web3Forms access key */}
  <input type="hidden" name="access_key" value="e2233d50-7bd9-406c-97d3-c93bd0e12fe7" />
  
  
  {/* Optional: Add subject for emails */}
  <input type="hidden" name="subject" value="New Submission from Web3Forms" />
  
  {/* Optional: Add from name for emails */}
  <input type="hidden" name="from_name" value="Your Website Name" />
  
  {/* Optional: Enable honeypot spam protection */}
  <input type="checkbox" name="botcheck" className="hidden" />
  
  {/* Your existing form fields */}
  <div className="grid grid-cols-2 gap-6">
    <div className="space-y-2">
      <Label htmlFor="firstName">First Name</Label>
      <Input id="firstName" name="firstName" placeholder="Enter your first name" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Last Name</Label>
      <Input id="lastName" name="lastName" placeholder="Enter your last name" />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email Address</Label>
    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="company">Company</Label>
    <Input id="company" name="company" placeholder="Enter your company name" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="subject">Subject</Label>
    <select 
      id="subject" 
      name="subject"
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled selected>Select an option</option>
      <option value="sales">Sales Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="demo">Request a Demo</option>
      <option value="partnership">Partnership Opportunity</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" name="message" placeholder="How can we help you?" rows={6} required />
  </div>

  <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">
    Send Message
  </Button>
</form>
            </motion.div>

            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Use the contact information below
                to get in touch with our team.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Headquarters</h3>
                    <p className="text-muted-foreground">
                      
                    AdeptAIPro Inc. - Lucid Private Offices<br/>
                       7300 State Highway 121, Suite 300, <br/>
                       McKinney, Texas, 75070
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Building className="w-6 h-6" />
                  </div>
                  {/* <div>
                    <h3 className="text-lg font-semibold mb-1">Global Offices</h3>
                    <p className="text-muted-foreground">
                      London • Singapore • Toronto<br />
                      New York • Berlin • Tokyo
                    </p>
                  </div> 
                </div> */}

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                    +1(302)277-6675<br />
                      Monday - Friday, 9am - 6pm PT
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@adeptaipro.com<br />
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Need Immediate Assistance?</h3>
                <p className="text-muted-foreground mb-4">
                  Our customer support team is available to help you with any urgent questions.
                </p>
                <Button variant="outline" className="w-full">
                  Live Chat Support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Locations"
            title="Find Us Worldwide"
            description="Visit one of our global offices or connect with us virtually."
          />

          <div className="max-w-6xl mx-auto mt-12">
            <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200">
              {/* This would be replaced with an actual map component */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-200">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.987469552859!2d-96.7089747260118!3d33.13569376557263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c16f7e17dcf1f%3A0x4aaccddff73da58d!2s7300%20State%20Hwy%20121%20%23300%2C%20McKinney%2C%20TX%2075070%2C%20USA!5e0!3m2!1sen!2sin!4v1742120642452!5m2!1sen!2sin" width="1200px" height="600px" loading="lazy" ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Support"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about contacting our team."
          />

          <motion.div
            className="max-w-3xl mx-auto mt-12 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                question: "What's the typical response time for inquiries?",
                answer: "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our live chat support for faster assistance.",
              },
              {
                question: "How can I schedule a product demo?",
                answer: "You can request a demo by filling out the contact form and selecting 'Request a Demo' as the subject. One of our product specialists will reach out to schedule a time that works for you.",
              },
              {
                question: "Do you offer technical support for existing customers?",
                answer: "Yes, existing customers can reach our technical support team via email at support@adeptai.com or through the support portal in your account dashboard.",
              },
              {
                question: "How do I report a bug or issue with your product?",
                answer: "Existing customers can report bugs through our support portal. If you're not a customer but have found an issue with our website or public content, please email us at support@adeptai.com.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-muted rounded-lg p-6"
                variants={fadeIn}
              >
                <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
