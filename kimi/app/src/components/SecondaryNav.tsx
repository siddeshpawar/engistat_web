import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Plans', href: '#plans' },
  { label: 'Prices', href: '#prices' },
  { label: 'Gallery', href: '#gallery' },
];

export default function SecondaryNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[60px] left-0 right-0 z-[80] bg-white/95 backdrop-blur-sm border-b border-[#111811]/10 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between px-[4vw] py-3">
        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#5E6B5A] hover:text-[#111811] text-xs md:text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-1.5 text-[#5E6B5A] hover:text-[#111811] text-xs font-medium transition-colors">
            <Phone size={12} />
            Enquire
          </button>
          <button className="hidden md:flex items-center gap-1.5 text-[#5E6B5A] hover:text-[#111811] text-xs font-medium transition-colors">
            <MessageCircle size={12} />
            Chat
          </button>
        </div>
      </div>
    </nav>
  );
}
