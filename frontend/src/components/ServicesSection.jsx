import { portfolioData } from '../data/mock';
import { CheckCircle2 } from 'lucide-react';

const ServicesSection = ({ serviceType }) => {
  const services = serviceType === 'realEstate' 
    ? portfolioData.realEstateServices 
    : portfolioData.socialMediaServices;

  const painPoints = serviceType === 'realEstate'
    ? portfolioData.painPoints.realEstate
    : portfolioData.painPoints.socialMedia;

  const problemTitle = serviceType === 'realEstate'
    ? "Most real estate owners are great at selling properties. Not at selling themselves."
    : "You're posting content. But where are the clients?";

  const problemBody = serviceType === 'realEstate'
    ? "Buyers research you online before they reach out. Your competitors with strong social presence are winning deals you don't even know about. The best properties sell themselves — but first, you need to sell YOU."
    : "Every day, potential clients are scrolling Instagram. They're looking for solutions you offer. But they're not finding you. Or worse — they find you, but nothing converts them from followers to paying clients.";

  return (
    <>
      {/* Problem Section */}
      <section id="problem" className="py-20 bg-primary text-primary-foreground scroll-reveal opacity-0">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {problemTitle}
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                {problemBody}
              </p>
              <div className="space-y-3">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                    <p className="text-base opacity-80">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden photo-zoom">
                <img
                  src="/images/sanika-2.jpeg"
                  alt="Behind the scenes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-background p-6 rounded-lg shadow-xl">
                <div className="font-display text-4xl font-bold">170+</div>
                <div className="text-sm font-medium">Leads · Single Post</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 scroll-reveal opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              How I Help You Win
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proven systems that generate leads, build your brand, and close deals.
            </p>
          </div>

          <div className={`grid ${services.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-secondary/30 rounded-2xl p-8 hover-lift border border-border hover:border-accent transition-all duration-300"
              >
                <h3 className="font-display text-2xl font-bold mb-4 gold-underline inline-block">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
