import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { developers } from '../data/projects'
import InterestModal from '../components/InterestModal'

/* ──────────────────────────────────────────
   FULL-SCREEN PARALLAX PROJECT SECTION
────────────────────────────────────────── */
function ProjectSection({ project, index, devName, onInterest }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px'])

  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            isEven
              ? 'bg-gradient-to-r from-black/95 via-black/75 to-black/10'
              : 'bg-gradient-to-l from-black/95 via-black/75 to-black/10'
          }`}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className={`relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex ${isEven ? 'justify-start' : 'justify-end'}`}
      >
        <div className="max-w-lg">
          {/* Project number + status */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="text-emerald-500/60 font-mono text-xs">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px w-8 bg-emerald-500/40" />
            <span
              className={`text-xs px-3 py-1 rounded-full border ${
                project.status === 'Ready Possession'
                  ? 'border-emerald-500/40 text-emerald-400'
                  : project.status === 'Ongoing'
                  ? 'border-blue-500/40 text-blue-400'
                  : 'border-amber-500/40 text-amber-400'
              }`}
            >
              {project.status}
            </span>
          </motion.div>

          {/* Developer label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/30 text-xs uppercase tracking-widest mb-2"
          >
            {devName}
          </motion.p>

          {/* Project name */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-3"
          >
            {project.name}
          </motion.h2>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-emerald-400 text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.location}
          </motion.div>

          {/* Details row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <span className="text-xs text-white/50 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
              {project.bhk}
            </span>
            <span className="text-xs text-white/50 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
              {project.type}
            </span>
            <span className="text-xs text-emerald-400/70 bg-emerald-500/8 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              ✓ {project.rera}
            </span>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 mb-10"
          >
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {h}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => onInterest(project.name)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3"
            >
              <span className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wide transition-all duration-300">
                Express Interest
              </span>
              <span className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
                →
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────
   DEVELOPER DIVIDER SECTION
────────────────────────────────────────── */
function DeveloperDivider({ dev }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative h-[70vh] flex items-end overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img src={dev.heroImage} alt={dev.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <span className="text-white/30 text-xs uppercase tracking-[0.3em] block mb-3">
            {dev.tagline}
          </span>
          <h2 className="font-display text-6xl md:text-8xl font-bold text-white/90 leading-none mb-4">
            {dev.name}
          </h2>
          <div className="flex flex-wrap gap-6 mt-4">
            {dev.stats.map((s) => (
              <div key={s.label}>
                <div className="text-emerald-400 text-2xl font-display font-bold">{s.value}</div>
                <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────── */
export default function RealEstate() {
  const [modal, setModal] = useState({ open: false, project: '' })
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '35%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  const openModal = (project) => setModal({ open: true, project })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

  return (
    <main className="bg-obsidian">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroImgY }}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format&fit=crop&q=85"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
            Engistat Real Estate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Where Luxury<br />
            <span className="text-gradient">Meets Legacy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/50 text-lg max-w-xl leading-relaxed mb-10"
          >
            Curated residential properties from Mumbai's most iconic developers —
            all RERA registered, all presented exclusively through Engistat.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            onClick={() => openModal('General Real Estate Enquiry')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wide transition-colors"
          >
            Express Your Interest →
          </motion.button>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-10 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── DEVELOPER SECTIONS ── */}
      {developers.map((dev) => {
        let projIndex = 0
        return (
          <div key={dev.id}>
            <DeveloperDivider dev={dev} />
            {dev.projects.map((project) => (
              <ProjectSection
                key={project.name}
                project={project}
                index={projIndex++}
                devName={dev.name}
                onInterest={openModal}
              />
            ))}
          </div>
        )
      })}

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto px-8 text-center"
        >
          <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Ready to Move?</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Find Your Perfect Home.
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Share your preferences — budget, location, BHK requirement — and
            we will connect you with the right opportunity directly.
          </p>
          <motion.button
            onClick={() => openModal('General Real Estate Enquiry')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300"
          >
            Start Conversation →
          </motion.button>
        </motion.div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="border-t border-white/5 py-8 px-8">
        <p className="text-white/20 text-xs text-center max-w-3xl mx-auto leading-relaxed">
          All project information sourced from official developer websites. Always verify RERA registration
          on the MahaRERA portal before any investment. Engistat is not a registered real estate agent
          and does not charge brokerage. "Raheja" projects are developed by K Raheja Realty —
          an independent entity unaffiliated with other Raheja group companies.
        </p>
      </div>

      <InterestModal
        open={modal.open}
        onClose={closeModal}
        project={modal.project}
      />
    </main>
  )
}
