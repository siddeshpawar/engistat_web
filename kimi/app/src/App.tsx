import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import SecondaryNav from './components/SecondaryNav';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ParkCanvasSection from './sections/ParkCanvasSection';
import LiveInspiredSection from './sections/LiveInspiredSection';
import ParkLivingSection from './sections/ParkLivingSection';
import TowersSection from './sections/TowersSection';
import ResidencesSection from './sections/ResidencesSection';
import NeighborhoodSection from './sections/NeighborhoodSection';
import ContactFooter from './sections/ContactFooter';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global scroll snap configuration
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      <SecondaryNav />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ParkCanvasSection />
        <LiveInspiredSection />
        <ParkLivingSection />
        <TowersSection />
        <ResidencesSection />
        <NeighborhoodSection />
        <ContactFooter />
      </main>
    </div>
  );
}

export default App;
