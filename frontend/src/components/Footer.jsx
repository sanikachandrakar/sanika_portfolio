import { portfolioData } from '../data/mock';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              {personal.name}
            </h3>
            <p className="text-sm opacity-80">
              {personal.title}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#services" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                Services
              </a>
              <a href="/case-studies" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                Case Studies
              </a>
              <a href="#testimonials" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                Testimonials
              </a>
              <a href="#contact" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a 
                href={`mailto:${personal.email}`}
                className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
              >
                {personal.email}
              </a>
              <a 
                href={`tel:${personal.phone}`}
                className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
              >
                {personal.phone}
              </a>
              <a 
                href={personal.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all flex items-center gap-2"
              >
                <Instagram size={16} />
                {personal.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">
            {personal.name} · {personal.location}
          </p>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
