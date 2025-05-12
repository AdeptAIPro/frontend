
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/Service/ServiceHero';
import ServiceOfferingList from '@/components/Service/ServiceOfferingList';
import ProcessSteps from '@/components/Service/ProcessSteps';
import GlobalHiringModels from '@/components/Service/GlobalHiringModels';
import WhyChooseAdeptAI from '@/components/Service/WhyChooseAdeptAI';
import ServiceBenefits from '@/components/Service/ServiceBenefits';
import Industries from '@/components/Service/Industries';
import Testimonials from '@/components/Service/Testimonials';
import ServiceCTA from '@/components/Service/ServiceCTA';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-20">
        <ServiceHero />
        <ServiceOfferingList />
        <GlobalHiringModels />
        <ProcessSteps />
        <WhyChooseAdeptAI />
        <ServiceBenefits />
        <Industries />
        <Testimonials />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
