import { portfolioData } from '../data/mock';

const ProcessSection = () => {
  const { process } = portfolioData;

  return (
    <section className="py-20 scroll-reveal opacity-0">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step framework to transform your online presence into a lead-generating machine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line */}
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-accent/20" />
              )}

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center font-display text-2xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
