import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/mock';

const HeroSection = ({ serviceType, setServiceType }) => {
  const { personal, stats } = portfolioData;

  const content = {
    realEstate: {
      headline: "I Help You Sell More. Faster.",
      subline: "Lead Generation · Personal Branding · Sales Closing for Real Estate",
      body: "Real estate owners: I generate qualified leads through organic social media, build your personal brand online, and close prospects on calls so you can focus on properties, not pipelines.",
      badge: "● Available for Real Estate Projects",
      image: "/images/sanika-1.jpeg"
    },
    socialMedia: {
      headline: "Your Brand. My Strategy. Real Results.",
      subline: "Funnel Building · Lead Generation · Instagram Growth",
      body: "I help small business owners build their personal brand, generate leads organically, and convert followers into paying clients — through content strategy and sales funnels that actually work.",
      badge: "● Available for New Projects",
      image: "/images/sanika-3.jpeg"
    }
  };

  const current = content[serviceType];

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Service Type Toggle */}
        <div className="flex justify-center mb-12 opacity-0 animate-fadeIn">
          <div className="inline-flex bg-secondary rounded-full p-1 gap-1">
            <button
              onClick={() => setServiceType('realEstate')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${serviceType === 'realEstate'
                ? 'bg-accent text-background'
                : 'text-foreground hover:text-accent'
                }`}
            >
              Real Estate
            </button>
            <button
              onClick={() => setServiceType('socialMedia')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${serviceType === 'socialMedia'
                ? 'bg-accent text-background'
                : 'text-foreground hover:text-accent'
                }`}
            >
              Social Media
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="opacity-0 animate-fadeUp stagger-1">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-semibold uppercase tracking-widest mb-4 animate-pulse-slow">
                {current.badge}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight opacity-0 animate-fadeUp stagger-2">
              {current.headline}
            </h1>

            <p className="text-lg md:text-xl text-accent font-medium opacity-0 animate-fadeUp stagger-3">
              {current.subline}
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed opacity-0 animate-fadeUp stagger-4">
              {current.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fadeUp stagger-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Let's Talk
                <ArrowRight size={20} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-background transition-all hover:-translate-y-1"
              >
                See How
                <ChevronDown size={20} />
              </a>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8 opacity-0 animate-fadeUp stagger-6">
              <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg">
                <div className="font-display text-3xl font-bold text-accent">{stats.profileViews}</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </div>
              <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg">
                <div className="font-display text-3xl font-bold text-accent">{stats.leadsFromReel}</div>
                <div className="text-sm text-muted-foreground">Leads · Single Post</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative opacity-0 animate-fadeIn stagger-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden photo-zoom">
              <img
                src={current.image}
                alt={personal.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute top-8 -left-4 bg-background/95 backdrop-blur-md p-4 rounded-lg shadow-xl animate-float">
              <div className="font-display text-2xl font-bold text-accent">{stats.contentChallenge}✓</div>
              <div className="text-xs text-muted-foreground">Days Challenge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
