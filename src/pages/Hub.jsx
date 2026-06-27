import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import InterestModal from '../components/InterestModal'

const ventures = [
  {
    to: '/real-estate',
    index: '01',
    label: 'Real Estate',
    sub: 'Lodha · K Raheja · Raymond Realty',
    description: "India's premium residential properties curated by Engistat. Ultra-luxury to integrated townships, RERA registered across Mumbai, Thane and Pune.",
    cta: 'Explore Properties',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&auto=format&fit=crop&q=85',
  },
  {
    to: '/training',
    index: '02',
    label: 'Training & Dev',
    sub: 'Live Google Meet · Paid Sessions',
    description: 'Expert-led workshops on cybersecurity, IAM, ClearPass, IoT home automation, and prototype-to-product engineering. CSR eligible.',
    cta: 'View Courses',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&auto=format&fit=crop&q=85',
  },
  {
    to: '/about',
    index: '03',
    label: 'Professional Journey',
    sub: 'Cyber Security · Network Engineering',
    description: '6+ years securing enterprise networks. Published post-quantum cryptography researcher. GVK Mumbai Airport · University of Surrey.',
    cta: 'View Profile',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&auto=format&fit=crop&q=85',
  },
]

function VentureSection({ v, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.1, 0.4], ['40px', '0px'])

  const isEven = i % 2 === 0

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imgY }}
      >
        <img
          src={v.image}
          alt={v.label}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            isEven
              ? 'bg-gradient-to-r from-black/95 via-black/70 to-black/20'
              : 'bg-gradient-to-l from-black/95 via-black/70 to-black/20'
          }`}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className={`relative z-10 w-full max-w-7xl mx-auto px-8 flex ${isEven ? 'justify-start' : 'justify-end'}`}
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-emerald-500 font-mono text-sm">{v.index}</span>
            <div className="h-px w-12 bg-emerald-500/50" />
            <span className="text-white/40 text-xs uppercase tracking-widest">{v.sub}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-6xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            {v.label}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/50 text-base leading-relaxed mb-10 max-w-md"
          >
            {v.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to={v.to}
              className="group inline-flex items-center gap-3 text-white font-medium text-sm"
            >
              <span className="px-8 py-4 rounded-full border border-white/20 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-400">
                {v.cta}
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="text-emerald-400"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll progress line */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-24 flex flex-col items-center gap-2">
        <div className="w-px h-full bg-white/10" />
        <span className="text-white/20 text-xs rotate-90 origin-center whitespace-nowrap mt-4">scroll</span>
      </div>
    </section>
  )
}

export default function Hub() {
  const [modalOpen, setModalOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0])

  return (
    <main className="bg-obsidian">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-obsidian" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(16,185,129,0.15) 0%, transparent 65%)',
                'radial-gradient(ellipse 80% 60% at 70% 60%, rgba(16,185,129,0.12) 0%, transparent 65%)',
                'radial-gradient(ellipse 80% 60% at 40% 30%, rgba(16,185,129,0.18) 0%, transparent 65%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest mb-10"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"
            />
            Mumbai, India · Est. 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
          >
            <span className="text-gradient">ENGI</span>
            <span className="text-white">STAT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
          >
            Real estate. Technical education. Professional excellence.
            <br />
            Three ventures. One vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/real-estate"
              className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
            >
              Explore Ventures
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="px-9 py-4 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm transition-all duration-300"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-500/60 to-transparent" />
            <span className="text-white/20 text-xs uppercase tracking-widest">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── VENTURES — full screen sections ── */}
      {ventures.map((v, i) => (
        <VentureSection key={v.to} v={v} i={i} />
      ))}

      {/* ── FUNDING STRIP ── */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-emerald-500/60 mx-auto mb-10" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Open Opportunity</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Funding &amp; CSR<br />Partners Welcome.
            </h2>
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed mb-12">
              Engistat is open for strategic investment and CSR collaborations.
              Training programs qualify under Schedule VII skill development initiatives.
            </p>
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300"
            >
              Start a Conversation →
            </motion.button>
          </motion.div>
        </div>
      </section>

      <InterestModal open={modalOpen} onClose={() => setModalOpen(false)} project="General Enquiry — Engistat" />
    </main>
  )
}
