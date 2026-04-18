import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Instagram, Youtube, Linkedin, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  'What are the different towers present in Lodha Park?',
  'Are there any towers in Lodha Park that have flats with decks?',
  'What are the flat prices in Lodha Adrina?',
  'What are the available residence typologies in the towers at Lodha Park?',
  'How many floors are there in Lodha Kiara?',
  'What is the total area of Lodha Park?',
  'How many floors are there in Lodha Parkside?',
];

const footerLinks = [
  { label: 'Our Story', href: '#' },
  { label: 'Our Impact', href: '#' },
  { label: 'Our Developments', href: '#' },
  { label: 'Experiences', href: '#' },
  { label: 'Signature Hospitality', href: '#' },
  { label: 'Press Room', href: '#' },
  { label: 'Awards', href: '#' },
  { label: 'Blogs', href: '#' },
  { label: 'NRI', href: '#' },
  { label: 'Investor Relations', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'SMART ODR', href: '#' },
];

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contactRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        detailsRef.current,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0F08]"
      style={{ zIndex: 80 }}
    >
      {/* FAQ Section */}
      <div className="py-16 px-[6vw] border-b border-white/10">
        <h3 className="font-display text-white text-2xl md:text-3xl font-medium mb-8">
          Most common queries
        </h3>
        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-white/80 text-sm">{faq}</span>
                <ChevronDown
                  size={16}
                  className={`text-white/50 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === index && (
                <div className="pb-4">
                  <p className="text-white/50 text-sm">
                    Please contact our sales team for detailed information about this query.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="mt-6 text-[#CFE4A0] text-sm font-medium hover:text-[#bdd589] transition-colors">
          View More
        </button>

        {/* RERA */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs">
            MahaRERA Registration Numbers: P51900001339 | P51900014937
          </p>
          <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#CFE4A0] text-xs hover:underline mt-1 inline-block">
            https://maharera.maharashtra.gov.in
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-16 px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <form ref={formRef} className="lg:w-[46vw] space-y-6">
            <h2 className="font-display text-white text-4xl md:text-5xl font-medium">
              Begin your journey home.
            </h2>
            <p className="text-white/60 text-base">
              Schedule a private tour or request a curated brochure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CFE4A0]"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CFE4A0]"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Phone</label>
                <input
                  type="tel"
                  placeholder="+91"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CFE4A0]"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Interested in</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#CFE4A0]">
                  <option value="" className="bg-[#0B0F08]">Select</option>
                  <option value="2bhk" className="bg-[#0B0F08]">2 BHK</option>
                  <option value="3bhk" className="bg-[#0B0F08]">3 BHK</option>
                  <option value="4bhk" className="bg-[#0B0F08]">4 BHK</option>
                  <option value="duplex" className="bg-[#0B0F08]">Duplex</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#CFE4A0] text-[#0B0F08] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#bdd589] transition-colors"
            >
              Request a call
            </button>
          </form>

          {/* Contact Details */}
          <div ref={detailsRef} className="lg:w-[40vw] lg:pl-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-2">
                  <MapPin size={14} />
                  Sales Gallery
                </div>
                <p className="text-white/80 text-sm">
                  Lodha Park, Annie Besant Road,<br />
                  Worli, Mumbai
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-2">
                  <Phone size={14} />
                  Call
                </div>
                <p className="text-white/80 text-sm">+91 XXXXX XXXXX</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-2">
                  <Mail size={14} />
                  Email
                </div>
                <p className="text-white/80 text-sm">park@lodha.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-[6vw]">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Logo + Social */}
          <div>
            <a href="/" className="text-white font-display text-3xl tracking-[0.15em] font-medium">
              LODHA
            </a>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © Lodha Group 2026 All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
