import { useState, useEffect } from 'react';
import { portfolioData } from '../data/mock';
import HeroSection from '../components/HeroSection';
import Ticker from '../components/Ticker';
import ServicesSection from '../components/ServicesSection';
import StatsSection from '../components/StatsSection';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [serviceType, setServiceType] = useState('realEstate'); // 'realEstate' or 'socialMedia'

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grain-overlay">
      <HeroSection serviceType={serviceType} setServiceType={setServiceType} />
      <Ticker />
      <ServicesSection serviceType={serviceType} />
      <StatsSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;
