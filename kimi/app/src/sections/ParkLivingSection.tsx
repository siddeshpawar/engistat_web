import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ParkLivingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
        { opacity: 0.65, scale: 1.08 },
        { opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '24vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.06
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        [hairlineRef.current, labelsRef.current],
        { opacity: 0, y: '3vh' },
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
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
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
      className="w-screen h-screen relative overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/park_walkway_canopy.jpg"
          alt="Park walkway with tree canopy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Center Headline */}
      <div className="absolute inset-0 flex items-center justify-center z-[8]">
        <h2
          ref={headlineRef}
          className="font-display text-white text-5xl md:text-6xl lg:text-7xl font-medium text-center max-w-[78vw] leading-[0.95]"
        >
          Nothing beats park living.
        </h2>
      </div>

      {/* Right Address Panel */}
      <div
        ref={panelRef}
        className="absolute right-[4vw] top-[18vh] w-[30vw] min-w-[280px] z-[8] rounded-[10px] p-6"
        style={{ background: 'rgba(244,246,243,0.92)' }}
      >
        <h3 className="font-display text-[#111811] text-2xl font-medium mb-4">
          Lodha Park
        </h3>
        <div className="space-y-2 mb-6">
          <p className="text-[#5E6B5A] text-sm">Worli, Mumbai</p>
          <p className="text-[#5E6B5A] text-sm">2, 3 & 4 Bed Residences</p>
          <p className="text-[#CFE4A0] text-sm font-medium">Ready to move in</p>
        </div>
        <button className="flex items-center gap-2 bg-[#CFE4A0] text-[#0B0F08] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#bdd589] transition-colors">
          <Download size={14} />
          Download brochure
        </button>
      </div>

      {/* Bottom Hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[4vw] right-[4vw] bottom-[8vh] z-[8] h-px bg-white/30"
      />

      {/* Bottom Labels */}
      <div
        ref={labelsRef}
        className="absolute left-[4vw] bottom-[5.5vh] z-[8] flex gap-6"
      >
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">7-acre park</span>
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">50,000 sq.ft. clubhouse</span>
        <span className="text-white/70 text-xs uppercase tracking-[0.08em]">Bandra-Worli Sea Link proximity</span>
      </div>
    </section>
  );
}
