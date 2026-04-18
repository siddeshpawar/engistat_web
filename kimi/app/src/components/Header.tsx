import { useEffect, useState } from 'react';
import { Menu, Phone, MessageCircle, Search } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0F08]/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[4vw] py-4">
          {/* Logo */}
          <a href="/" className="text-white font-display text-2xl tracking-[0.15em] font-medium">
            LODHA
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-white text-[11px] uppercase tracking-[0.12em] font-medium transition-colors">
              Our Story
            </a>
            <a href="#" className="text-white/90 hover:text-white text-[11px] uppercase tracking-[0.12em] font-medium transition-colors">
              Our Impact
            </a>
            <a href="#" className="text-white/90 hover:text-white text-[11px] uppercase tracking-[0.12em] font-medium transition-colors">
              Our Projects
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button className="hidden md:flex items-center gap-2 text-white/90 hover:text-white text-[11px] uppercase tracking-[0.08em] transition-colors">
              <Phone size={14} />
              <span>Enquire</span>
            </button>
            <button className="hidden md:flex items-center gap-2 text-white/90 hover:text-white text-[11px] uppercase tracking-[0.08em] transition-colors">
              <MessageCircle size={14} />
              <span>Chat</span>
            </button>
            <button className="hidden md:flex items-center gap-2 text-white/90 hover:text-white text-[11px] uppercase tracking-[0.08em] transition-colors">
              <Search size={14} />
              <span>Search</span>
            </button>
            <button className="text-white/90 hover:text-white transition-colors lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* RERA Badge */}
      <div className="fixed top-20 right-4 z-[90] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg max-w-[200px]">
        <p className="text-[10px] text-[#5E6B5A] leading-tight">
          Click here for RERA details
        </p>
        <p className="text-[9px] text-[#5E6B5A] mt-1">
          MahaRERA: P51900001339, P51900014937
        </p>
      </div>
    </>
  );
}
