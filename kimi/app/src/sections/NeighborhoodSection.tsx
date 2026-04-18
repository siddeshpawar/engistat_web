import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { name: 'Bandra-Worli Sea Link', time: '20 mins' },
  { name: 'Mumbai International Airport', time: '30 mins' },
  { name: 'Peninsula Corporate Park', time: '10 mins' },
  { name: 'Palladium & High Street Phoenix', time: '05 mins' },
];

export default function NeighborhoodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bgRef.current,
        { opacity: 0.6, scale: 1.08 },
        { opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.16
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        [hairlineRef.current, labelsRef.current],
        { opacity: 0, y: '2vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0.18
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '16vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [hairlineRef.current, labelsRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.80
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="w-screen h-screen relative overflow-hidden"
      style={{ zIndex: 70 }}
    >
      {/* Background - Aerial City View */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/skyline_towers_tree.jpg"
          alt="Aerial view of neighborhood"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Left Content */}
      <div className="absolute left-[4vw] top-[14vh] max-w-[34vw] z-[8]">
        <h2
          ref={headlineRef}
          className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05]"
        >
          Explore the neighbourhood.
        </h2>
      </div>

      <div className="absolute left-[4vw] top-[30vh] max-w-[30vw] z-[8]">
        <p
          ref={bodyRef}
          className="text-white/85 text-sm md:text-base leading-relaxed"
        >
          Premier schools, healthcare, cultural venues, and seamless connectivity—minutes away.
        </p>
      </div>

      <div className="absolute left-[4vw] top-[48vh] z-[8]">
        <button
          ref={ctaRef}
          className="flex items-center gap-2 bg-[#CFE4A0] text-[#0B0F08] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#bdd589] transition-colors"
        >
          <MapPin size={14} />
          View location details
        </button>
      </div>

      {/* Right Info Panel */}
      <div
        ref={panelRef}
        className="absolute right-[4vw] top-[18vh] w-[30vw] min-w-[260px] z-[8] rounded-[10px] p-6"
        style={{ background: 'rgba(244,246,243,0.92)' }}
      >
        <h3 className="font-display text-[#111811] text-xl font-medium mb-5 flex items-center gap-2">
          <Clock size={18} />
          Connectivity
        </h3>
        <div className="space-y-4">
          {locations.map((loc) => (
            <div key={loc.name} className="flex justify-between items-center">
              <span className="text-[#5E6B5A] text-sm">{loc.name}</span>
              <span className="text-[#111811] text-sm font-medium">{loc.time}</span>
            </div>
          ))}
        </div>
        <p className="text-[#5E6B5A] text-[10px] mt-5 leading-relaxed">
          Note: All distances stated in minutes are estimated travel time on 2-wheelers during normal traffic.
        </p>
      </div>

      {/* Bottom Hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[4vw] right-[4vw] bottom-[8vh] z-[8] h-px bg-white/25"
      />

      {/* Bottom Labels */}
      <div
        ref={labelsRef}
        className="absolute left-[4vw] bottom-[5.5vh] z-[8] flex gap-6"
      >
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">Annie Besant Road</span>
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">Worli</span>
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">Mumbai</span>
      </div>
    </section>
  );
}
