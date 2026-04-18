import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Eye, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const residenceTypes = [
  {
    tab: '2 BHK',
    title: '2 Bed Residence',
    specs: ['Carpet: 850 sq.ft.', 'Deck: 80 sq.ft.'],
    image: '/collage_clubhouse.jpg',
  },
  {
    tab: '3 BHK',
    title: '3 Bed Premium',
    specs: ['Carpet: 1,180 sq.ft.', 'Deck: 120 sq.ft.'],
    image: '/collage_poolside.jpg',
  },
  {
    tab: '4 BHK',
    title: '4 Bed Luxury',
    specs: ['Carpet: 1,650 sq.ft.', 'Deck: 180 sq.ft.'],
    image: '/amenities_pool_walkway.jpg',
  },
  {
    tab: 'Duplex',
    title: 'Duplex Residence',
    specs: ['Carpet: 2,400 sq.ft.', 'Deck: 250 sq.ft.'],
    image: '/hero_pool_bridge.jpg',
  },
];

export default function ResidencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content reveal
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Right content reveal
      gsap.fromTo(
        rightRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const currentResidence = residenceTypes[activeTab];

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="relative bg-[#F4F6F3] py-[8vh] px-[6vw]"
      style={{ zIndex: 60 }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column */}
        <div ref={leftRef} className="lg:max-w-[42vw]">
          <h2 className="font-display text-[#111811] text-4xl md:text-5xl font-medium mb-6">
            Choose your residence
          </h2>
          <p className="text-[#5E6B5A] text-base leading-relaxed mb-8 max-w-md">
            Thoughtfully planned homes with ample light, ventilation, and park views.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {residenceTypes.map((type, index) => (
              <button
                key={type.tab}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === index
                    ? 'bg-[#111811] text-white'
                    : 'bg-[#111811]/10 text-[#5E6B5A] hover:bg-[#111811]/20'
                }`}
              >
                {type.tab}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 text-[#111811] text-sm font-medium hover:text-[#5E6B5A] transition-colors">
            View all floor plans
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Right Column - Carousel */}
        <div ref={rightRef} className="lg:ml-auto lg:w-[52vw]">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-[16/10] relative">
              <img
                src={currentResidence.image}
                alt={currentResidence.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : residenceTypes.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveTab((prev) => (prev < residenceTypes.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-display text-[#111811] text-2xl font-medium mb-3">
                {currentResidence.title}
              </h3>
              <div className="flex gap-6 mb-4">
                {currentResidence.specs.map((spec) => (
                  <span key={spec} className="text-[#5E6B5A] text-sm">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-[#CFE4A0] text-[#0B0F08] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#bdd589] transition-colors">
                  <Eye size={14} />
                  View plan
                </button>
                <button className="flex items-center gap-2 border border-[#111811]/20 text-[#111811] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#111811]/5 transition-colors">
                  <MessageCircle size={14} />
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
