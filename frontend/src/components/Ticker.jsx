import { useEffect, useRef } from 'react';

const Ticker = () => {
  const tickerRef = useRef(null);

  const items = [
    'Lead Generation',
    'Personal Branding',
    'Sales Closing',
    'Instagram Growth',
    'Funnel Building',
    '3.5+ Years Experience',
    '115K+ Profile Views',
    '170+ Leads · Single Reel'
  ];

  return (
    <div className="bg-primary text-primary-foreground py-6 overflow-hidden">
      <div 
        ref={tickerRef}
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: 'ticker 30s linear infinite'
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items].map((item, index) => (
          <span 
            key={index}
            className="font-display text-2xl font-medium opacity-90"
          >
            {item} <span className="text-accent mx-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
