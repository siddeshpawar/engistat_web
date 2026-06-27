import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { developers } from '../data/projects'
import MumbaiMap from '../components/MumbaiMap'
import InterestModal from '../components/InterestModal'
import { getStoredVisitor } from '../components/PhoneGate'

export default function RealEstateHub() {
  const [showBanner, setShowBanner] = useState(true)
  const [modal, setModal] = useState({ open: false, project: '' })
  const visitor = getStoredVisitor()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main className="bg-obsidian">

      {/* ── WELCOME BANNER ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden relative z-40 pt-20"
          >
            <div className="bg-gradient-to-r from-emerald-900/60 via-emerald-800/40 to-emerald-900/60 border-b border-emerald-500/20 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block" />
                  <span className="text-emerald-100 text-sm font-medium">
                    {visitor?.name
                      ? `Welcome back, ${visitor.name.split(' ')[0]} — `
                      : 'Welcome — '}
                    <span className="text-white/60 font-normal">
                      You are browsing Real Estate with Engistat. All listings are RERA registered.
                      Express interest on any property and we will connect you directly.
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-white/30 hover:text-white transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} className={`relative flex items-end overflow-hidden ${showBanner ? 'h-[85vh]' : 'h-screen'}`}>
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format&fit=crop&q=85"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-5">
            <Link to="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">Engistat</Link>
            <span className="text-white/20">/</span>
            <span className="text-emerald-400 text-sm">Real Estate</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Where Luxury<br />
            <span className="text-gradient">Meets Legacy.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-white/50 text-lg max-w-xl leading-relaxed mb-8">
            13 handpicked projects from Mumbai's most iconic developers — Lodha, K Raheja Realty, and Raymond Realty. All RERA registered.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            onClick={() => setModal({ open: true, project: 'General Real Estate Enquiry' })}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm"
          >
            Express Interest →
          </motion.button>
        </motion.div>
      </section>

      {/* ── MAP + DEVELOPER NAV ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14 text-center">
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Explore by Location</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
              Mumbai Property Map
            </h2>
            <p className="text-white/40 text-sm mt-3">Click any marker to explore that project</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="lg:col-span-3 relative"
            >
              <div className="border border-white/8 rounded-3xl overflow-hidden bg-black/20 p-2">
                <MumbaiMap className="h-[500px] md:h-[600px]" />
              </div>
              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-white/30 text-xs">Property location — click to open project page</span>
              </div>
            </motion.div>

            {/* Developer list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {developers.map((dev) => (
                <Link
                  key={dev.slug}
                  to={`/real-estate/${dev.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-emerald-500/30 transition-all duration-400"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img src={dev.heroImage} alt={dev.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
                    <div className="absolute inset-0 flex items-center px-6 justify-between">
                      <div>
                        <div className="text-white/30 text-xs uppercase tracking-widest mb-1">{dev.tagline}</div>
                        <div className="font-display text-xl font-bold text-white">{dev.name}</div>
                        <div className="text-emerald-400 text-xs mt-1">{dev.projects.length} Projects →</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {dev.stats.slice(0, 2).map((s) => (
                          <div key={s.label} className="text-right">
                            <div className="text-emerald-400 text-sm font-bold font-display">{s.value}</div>
                            <div className="text-white/25 text-xs">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ALL PROJECTS QUICK GRID ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-12">
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">All Projects</span>
            <h2 className="font-display text-4xl font-bold text-white mt-2">Browse by Developer</h2>
          </motion.div>

          {developers.map((dev) => (
            <div key={dev.slug} className="mb-16">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{dev.name}</h3>
                  <p className="text-white/30 text-sm">{dev.tagline}</p>
                </div>
                <Link to={`/real-estate/${dev.slug}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                  View All {dev.projects.length} →
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dev.projects.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/real-estate/${dev.slug}/${p.slug}`}
                      className="group block relative overflow-hidden rounded-2xl h-48 border border-white/6 hover:border-emerald-500/30 transition-all duration-400"
                    >
                      <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-white/30 text-xs mb-0.5">{p.location.split(',')[0]}</div>
                        <div className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors leading-snug">{p.name}</div>
                        <div className={`mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full ${p.status === 'Ready Possession' ? 'text-emerald-400 bg-emerald-500/15' : 'text-blue-400 bg-blue-500/15'}`}>
                          {p.status.split(' — ')[0]}
                        </div>
                      </div>
                      {p.videoId && (
                        <div className="absolute top-3 right-3">
                          <div className="w-7 h-7 rounded-full bg-red-600/80 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <InterestModal open={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))} project={modal.project} />
    </main>
  )
}
