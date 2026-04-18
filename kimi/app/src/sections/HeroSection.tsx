import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 }
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );

      // Subheadline entrance
      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      // CTA + microcopy + dots + hairline
      tl.fromTo(
        [ctaRef.current, microcopyRef.current, dotsRef.current, hairlineRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, microcopyRef.current, dotsRef.current, hairlineRef.current], {
              opacity: 1, y: 0, x: 0
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        },
      });

      // ENTRANCE (0-30%): Hold - hero already entered on load
      // Just subtle parallax on background
      scrollTl.fromTo(
        bgRef.current,
        { y: '0vh' },
        { y: '-2vh', ease: 'none' },
        0
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      // Headline group exits
      scrollTl.fromTo(
        [headlineRef.current, subheadRef.current],
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // CTA + microcopy + dots exit
      scrollTl.fromTo(
        [ctaRef.current, microcopyRef.current, dotsRef.current, hairlineRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Background scales and moves
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: '-2vh' },
        { scale: 1.06, y: '-8vh', ease: 'none' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen relative overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_pool_bridge.jpg"
          alt="Luxury pool with walkway bridge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[8] px-4">
        <h1
          ref={headlineRef}
          className="font-display text-white text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[0.95] max-w-[70vw]"
          style={{ opacity: 0 }}
        >
          An urban oasis in the heart of the city
        </h1>
        <p
          ref={subheadRef}
          className="font-body text-white/90 text-center text-sm md:text-base mt-6 tracking-wide"
          style={{ opacity: 0 }}
        >
          2 & 3 Bed Residences at Worli
        </p>
      </div>

      {/* Bottom Right CTA */}
      <button
        ref={ctaRef}
        className="absolute right-[4vw] bottom-[6vh] z-[8] bg-[#CFE4A0] text-[#0B0F08] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#bdd589] transition-colors"
        style={{ opacity: 0 }}
      >
        Book a private tour
      </button>

      {/* Bottom Left Microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-[4vw] bottom-[6vh] z-[8] max-w-[26vw]"
        style={{ opacity: 0 }}
      >
        <p className="text-white/80 text-xs md:text-sm leading-relaxed">
          7-acre private park · 50,000 sq.ft. clubhouse · Ready to move in
        </p>
      </div>

      {/* Dot Indicators */}
      <div
        ref={dotsRef}
        className="absolute left-[4vw] bottom-[10.5vh] z-[8] flex gap-2.5"
        style={{ opacity: 0 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#CFE4A0]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>

      {/* Hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[4vw] right-[4vw] bottom-[8.2vh] z-[8] h-px bg-white/25"
        style={{ opacity: 0 }}
      />
    </section>
  );
}
