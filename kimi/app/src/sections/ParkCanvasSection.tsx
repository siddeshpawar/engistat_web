import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParkCanvasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

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
      // Background slides in
      scrollTl.fromTo(
        bgRef.current,
        { x: '12vw', scale: 1.08, opacity: 0.6 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Left panel slides in
      scrollTl.fromTo(
        panelRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { y: '22vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Body
      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.10
      );

      // Caption
      scrollTl.fromTo(
        captionRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30-70%): Static - no animation

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.05, x: '-6vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, captionRef.current],
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
      style={{ zIndex: 20 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/aerial_park_lawn.jpg"
          alt="Aerial view of park with water feature"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Text Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[38vw] h-full z-[5]"
        style={{ background: 'rgba(11,15,8,0.42)' }}
      />

      {/* Content */}
      <div className="absolute left-[4vw] top-[14vh] max-w-[28vw] z-[6]">
        <h2
          ref={headlineRef}
          className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.05]"
        >
          Imagine a park that's your own personal canvas.
        </h2>
      </div>

      <div className="absolute left-[4vw] top-[34vh] max-w-[28vw] z-[6]">
        <p
          ref={bodyRef}
          className="text-white/85 text-sm md:text-base leading-relaxed"
        >
          Seven acres of landscaped gardens, water features, and quiet pathways—designed for morning walks, weekend picnics, and evenings that feel far from the city.
        </p>
      </div>

      <div className="absolute left-[4vw] bottom-[7vh] max-w-[28vw] z-[6]">
        <p
          ref={captionRef}
          className="text-white/60 text-xs uppercase tracking-[0.08em]"
        >
          Masterplan designed by renowned landscape architects.
        </p>
      </div>
    </section>
  );
}
