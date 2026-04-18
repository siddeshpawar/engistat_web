import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
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

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Experiences section
      gsap.fromTo(
        experiencesRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: experiencesRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      // Ecosystem section
      gsap.fromTo(
        ecosystemRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ecosystemRef.current,
            start: 'top 85%',
            end: 'top 60%',
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
      id="about"
      className="relative bg-[#F4F6F3] py-20 px-[6vw]"
      style={{ zIndex: 15 }}
    >
      {/* Project Title */}
      <div ref={titleRef} className="text-center mb-16">
        <h2 className="font-display text-[#111811] text-5xl md:text-6xl font-medium tracking-[0.05em]">
          LODHA
        </h2>
        <h3 className="font-display text-[#111811] text-3xl md:text-4xl font-normal tracking-[0.15em] -mt-1">
          PARK
        </h3>
        <p className="text-[#5E6B5A] text-base mt-4">
          An urban oasis in the heart of the city
        </p>
      </div>

      {/* Main Description */}
      <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-20">
        <p className="text-[#111811] text-lg md:text-xl leading-relaxed">
          Of all the privileges of living at Lodha Park, the rarest is living around a 7-acre private park.
          A place for those who want more out of life, who want to be connected to the city but remain untouched by its chaos. 
          The ones who want amenities to not only just relax but also get inspired. Lodha Park is designed for those who don't 
          just want a place to live but a residence that promises good health happiness and absolute well-being.
        </p>
      </div>

      {/* One Park Many Experiences */}
      <div ref={experiencesRef} className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        <div className="lg:w-1/2">
          <img
            src="/aerial_park_lawn.jpg"
            alt="Park experiences"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h3 className="font-display text-[#111811] text-3xl md:text-4xl font-medium mb-4">
            One Park. Many Experiences.
          </h3>
          <p className="text-[#5E6B5A] text-base leading-relaxed">
            Lodha Park is a tapestry of experiences so rich, it would take a lifetime to enjoy all of them. 
            Morning walks by a garden, weekend picnics in the lawns, fruit and vegetables from a private orchard 
            and organic garden - experiences you could never have envisioned, are now yours to enjoy in the heart of the city.
          </p>
        </div>
      </div>

      {/* Social Ecosystem */}
      <div ref={ecosystemRef} className="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src="/collage_clubhouse.jpg"
            alt="Social ecosystem"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h3 className="font-display text-[#111811] text-3xl md:text-4xl font-medium mb-4">
            Not just an ecosystem. A social ecosystem.
          </h3>
          <p className="text-[#5E6B5A] text-base leading-relaxed">
            With several areas for activity, leisure & recreation dotting its vast landscape, Lodha Park creates 
            the perfect ecosystem for its elite residents to meet, socialize, and bond. Picnic spots, garden pavilions, 
            a restaurant, banquet facilities, and a clubhouse - Lodha Park is designed to create a community of like-minded 
            people from diverse professions, where exchanging views is as easy as sharing a cup of coffee.
          </p>
        </div>
      </div>
    </section>
  );
}
