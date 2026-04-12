import { portfolioData } from '../data/mock';

const AboutSection = () => {
  const { personal, about } = portfolioData;

  return (
    <section id="about" className="py-20 scroll-reveal opacity-0">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden photo-zoom">
                <img
                  src="/images/sanika-1.jpeg"
                  alt="Sanika working"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden photo-zoom">
                <img
                  src="/images/sanika-4.jpeg"
                  alt="Sanika lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden photo-zoom">
                <img
                  src="/images/sanika-2.jpeg"
                  alt="Sanika BTS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden photo-zoom">
                <img
                  src="/images/sanika-3.jpeg"
                  alt="Sanika portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Hi, I'm {personal.name.split(' ')[0]}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {about.story}
            </p>
            <blockquote className="font-display text-2xl font-medium italic text-accent mb-8 pl-6 border-l-4 border-accent">
              "{personal.quote}"
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {about.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
