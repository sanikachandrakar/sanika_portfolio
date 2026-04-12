import { portfolioData } from '../data/mock';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

const CaseStudies = () => {
  const { caseStudies } = portfolioData;

  return (
    <div className="grain-overlay pt-24 pb-12">
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Real businesses. Real results. Here's how I've helped clients transform their online presence into revenue-generating machines.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12">
        <div className="container mx-auto px-6 space-y-20">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden photo-zoom shadow-2xl">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                  {study.industry}
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {study.title}
                </h2>

                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {study.duration}
                  </div>
                  <div>•</div>
                  <div>{study.client}</div>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-accent">Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-accent">Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-accent">Results</h3>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {Object.entries(study.metrics).slice(0, 4).map(([key, value], idx) => (
                    <div key={idx} className="bg-secondary/50 p-4 rounded-lg">
                      <div className="font-display text-2xl font-bold text-accent mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-background mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Be the Next Success Story?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can achieve similar results for your business.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-background text-accent font-semibold rounded-lg hover:bg-background/90 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Start Your Success Story
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
