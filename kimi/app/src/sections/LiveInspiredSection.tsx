import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LiveInspiredSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const thumbARef = useRef<HTMLDivElement>(null);
  const thumbBRef = useRef<HTMLDivElement>(null);
  const thumbCRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0.6, scale: 1.06 },
        { opacity: 1, scale: 1, ease: 'none' },
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
        0.06
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        collageRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.10
      );

      // Thumbnails staggered
      scrollTl.fromTo(
        thumbARef.current,
        { y: '-10vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(
        thumbBRef.current,
        { y: '10vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.18
      );

      scrollTl.fromTo(
        thumbCRef.current,
        { y: '10vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.22
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.3, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        collageRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [thumbARef.current, thumbBRef.current, thumbCRef.current],
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
      id="amenities"
      className="w-screen h-screen relative overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/amenities_pool_walkway.jpg"
          alt="Resort-style pool with walkway"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[44vw] h-full z-[5]"
        style={{ background: 'rgba(11,15,8,0.45)' }}
      />

      {/* Headline */}
      <div className="absolute left-[4vw] top-[14vh] max-w-[34vw] z-[6]">
        <h2
          ref={headlineRef}
          className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05]"
        >
          Live inspired.
        </h2>
      </div>

      {/* Subheadline */}
      <div className="absolute left-[4vw] top-[30vh] max-w-[34vw] z-[6]">
        <p
          ref={subheadRef}
          className="text-white/85 text-sm md:text-base leading-relaxed"
        >
          A 50,000 sq.ft. clubhouse, multiple pools, and spaces for play, work, and celebration—set within a 7-acre private park.
        </p>
      </div>

      {/* Right Collage */}
      <div
        ref={collageRef}
        className="absolute right-[4vw] top-[18vh] w-[34vw] h-[64vh] z-[7]"
      >
        {/* Thumb A - Top */}
        <div
          ref={thumbARef}
          className="absolute left-0 top-0 w-full h-[46%] rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="/collage_poolside.jpg"
            alt="Poolside"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 left-3 text-white text-[11px] uppercase tracking-[0.08em] bg-black/30 px-2 py-1 rounded">
            Poolside
          </span>
        </div>

        {/* Thumb B - Bottom Left */}
        <div
          ref={thumbBRef}
          className="absolute left-0 bottom-0 w-[54%] h-[46%] rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="/collage_clubhouse.jpg"
            alt="Clubhouse"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 left-3 text-white text-[11px] uppercase tracking-[0.08em] bg-black/30 px-2 py-1 rounded">
            Clubhouse
          </span>
        </div>

        {/* Thumb C - Bottom Right */}
        <div
          ref={thumbCRef}
          className="absolute right-0 bottom-0 w-[42%] h-[46%] rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="/collage_play_area.jpg"
            alt="Play Area"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 left-3 text-white text-[11px] uppercase tracking-[0.08em] bg-black/30 px-2 py-1 rounded">
            Play
          </span>
        </div>
      </div>
    </section>
  );
}
