import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import im1 from "./adept.jpg"
import { ArrowRight, CheckCircle, Calendar, MapPin, Trophy, BadgeIcon as Certificate, Clock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const AdeptAIPageRelease: React.FC = () => {
  return (
    <>
    <Navbar/>
    <section id="events" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join us at these upcoming events to learn more about AdeptAI Pro and network with industry professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={im1}
                alt="JNU INNOVATE 2025: HACKATHON"
                width={600}
                height={500} 
                className="w-full h-[800px] object-contain"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">JNU INNOVATE 2025: HACKATHON</h3>
              <p className="text-gray-500 mb-4">
                Join us for an exciting hackathon sponsored by AdeptAI at Jaipur National University.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>April 5, 2025 (Saturday)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span>Central Library, SADTM Campus, JNU</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <span>Cash Prizes & Trophies</span>
                </div>
              </div>
              <Link to="/press">
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Register Now</Button>
              </Link>
            </CardContent>
          </Card>
       
          <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4 text-[#5e19e6]">
          JNU Innovate 2025 Hackathon Sponsorship
        </h2>
        <p>
          We are thrilled to announce that <strong>AdeptAI</strong> is the proud sponsor of{" "}
          <strong>JNU Innovate 2025: Hackathon</strong>, hosted by{" "}
          <strong>Jaipur National University, School of Engineering & Technology</strong>.
        </p>

        <h3 className="text-xl font-semibold mt-4 text-[#5e19e6]">Event Details:</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Date:</strong> April 5, 2025 (Saturday)
          </li>
          
          <li>
            <strong>Venue:</strong> Central Library, SADTM Campus, JNU
          </li>
          <li>
            <strong>Organized By:</strong> Computer Science Dept. (School of Engineering & Technology)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 text-[#5e19e6]">Why This Matters?</h3>
        <p>
          At AdeptAI, we believe in fostering innovation and empowering the next generation of
          tech leaders. By sponsoring this prestigious hackathon, we aim to support students,
          developers, and tech enthusiasts in their journey toward groundbreaking AI and software
          development.
        </p>

        <h3 className="text-xl font-semibold mt-4 text-[#5e19e6]">What’s in Store?</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Win Exciting Cash Prizes</strong>
          </li>
          <li>
            <strong>Earn Trophies & Certificates</strong>
          </li>
          <li>
            <strong>Showcase Their Skills to Industry Experts</strong>
          </li>
        </ul>

        <p className="mt-4">
          This collaboration is part of <strong>AdeptAI’s ongoing commitment</strong> to bridging the
          gap between academic excellence and real-world innovation.
        </p>

        <h3 className="text-xl font-semibold mt-4 text-[#5e19e6]">Stay Updated!</h3>
        <p>
          Follow our journey and future collaborations at{" "}
          <a href="#" className="underline text-[#5e19e6]">
            www.adeptaipro.com
          </a>
          .
        </p>

        <p className="mt-4">
          For sponsorship inquiries and partnership opportunities, feel free to reach out to our
          team.
        </p>

        <p className="text-lg font-bold mt-4">🚀 Let’s innovate together!</p>
      </div>
    </section>
 
          
        </div>
      </div>
    </section>
    </>
  );
};

export default AdeptAIPageRelease;
