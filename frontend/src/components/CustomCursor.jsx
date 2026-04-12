import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (window.innerWidth < 1024) return;

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      if (cursorDot) {
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
      }
      
      if (cursorRing) {
        cursorRing.style.left = `${clientX}px`;
        cursorRing.style.top = `${clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorRing) {
        cursorRing.style.width = '48px';
        cursorRing.style.height = '48px';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRing) {
        cursorRing.style.width = '32px';
        cursorRing.style.height = '32px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'none' }}
      />
      <div 
        ref={cursorRingRef}
        className="fixed w-8 h-8 border border-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'width 0.2s ease, height 0.2s ease' }}
      />
    </>
  );
};

export default CustomCursor;
