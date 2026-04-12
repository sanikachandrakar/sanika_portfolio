import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../data/mock';

const StatsSection = () => {
  const { stats } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const Counter = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const endValue = parseInt(end.replace(/[^0-9]/g, ''));
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * endValue));

        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return (
      <span>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-primary text-primary-foreground scroll-reveal opacity-0"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Real Numbers. Real Results.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-accent mb-2">
              {isVisible ? <Counter end="115" suffix="K+" /> : '0'}
            </div>
            <div className="text-sm md:text-base opacity-80">Profile Views</div>
          </div>

          <div className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-accent mb-2">
              {isVisible ? <Counter end="170" suffix="+" /> : '0'}
            </div>
            <div className="text-sm md:text-base opacity-80">Leads · Single Reel</div>
          </div>

          <div className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-accent mb-2">
              {isVisible ? <Counter end="56" suffix="K+" /> : '0'}
            </div>
            <div className="text-sm md:text-base opacity-80">Views in 30 Days</div>
          </div>

          <div className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-accent mb-2">
              {stats.experience}
            </div>
            <div className="text-sm md:text-base opacity-80">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
