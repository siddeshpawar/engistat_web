import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TowersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

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
        { opacity: 0.6, scale: 1.08, x: '8vw' },
        { opacity: 1, scale: 1, x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
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
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, microcopyRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen relative overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/skyline_towers_tree.jpg"
          alt="City skyline with towers and park"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[40vw] h-full z-[5]"
        style={{ background: 'rgba(11,15,8,0.45)' }}
      />

      {/* Headline */}
      <div className="absolute left-[4vw] top-[14vh] max-w-[30vw] z-[6]">
        <h2
          ref={headlineRef}
          className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.05]"
        >
          In the heart of South Mumbai.
        </h2>
      </div>

      {/* Body */}
      <div className="absolute left-[4vw] top-[32vh] max-w-[30vw] z-[6]">
        <p
          ref={bodyRef}
          className="text-white/85 text-sm md:text-base leading-relaxed"
        >
          Located on the prestigious Annie Besant Road, with easy access to the Bandra-Worli Sea Link, premier schools, and the best of Worli.
        </p>
      </div>

      {/* Microcopy */}
      <div className="absolute left-[4vw] bottom-[7vh] max-w-[34vw] z-[6]">
        <p
          ref={microcopyRef}
          className="text-white/60 text-xs uppercase tracking-[0.08em]"
        >
          An address that connects greenery to the city's finest conveniences.
        </p>
      </div>
    </section>
  );
}
