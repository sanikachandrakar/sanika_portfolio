import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          Sanika Chandrakar
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`gold-underline text-sm font-medium ${
              isActive('/') ? 'text-accent' : 'text-foreground hover:text-accent'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/case-studies" 
            className={`gold-underline text-sm font-medium ${
              isActive('/case-studies') ? 'text-accent' : 'text-foreground hover:text-accent'
            }`}
          >
            Case Studies
          </Link>
          <a 
            href="#contact" 
            className="gold-underline text-sm font-medium text-foreground hover:text-accent"
          >
            Contact
          </a>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive('/') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/case-studies" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive('/case-studies') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Case Studies
            </Link>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-foreground"
            >
              Contact
            </a>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {isDark ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
