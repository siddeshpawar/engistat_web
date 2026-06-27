import { useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { developers } from '../data/projects'
import InterestModal from '../components/InterestModal'

export default function DeveloperPage() {
  const { devSlug } = useParams()
  const navigate = useNavigate()
  const dev = developers.find((d) => d.slug === devSlug)
  const [modal, setModal] = useState({ open: false, project: '' })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  if (!dev) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-4 pt-20">
        <p className="text-white/40 text-lg">Developer not found.</p>
        <Link to="/real-estate" className="text-emerald-400 text-sm hover:underline">← Back to Real Estate</Link>
      </div>
    )
  }

  return (
    <main className="bg-obsidian">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img src={dev.heroImage} alt={dev.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/" className="text-white/30 hover:text-white/60 transition-colors">Engistat</Link>
            <span className="text-white/20">/</span>
            <Link to="/real-estate" className="text-white/30 hover:text-white/60 transition-colors">Real Estate</Link>
            <span className="text-white/20">/</span>
            <span className="text-emerald-400">{dev.name}</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-emerald-400 text-xs uppercase tracking-[0.35em] mb-4"
          >
            {dev.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {dev.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/40 text-lg max-w-xl leading-relaxed mb-10"
          >
            {dev.shortDesc}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap gap-8"
          >
            {dev.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-emerald-400">{s.value}</div>
                <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-14">
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">{dev.projects.length} Projects</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Featured Developments</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dev.projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div
                  onClick={() => navigate(`/real-estate/${dev.slug}/${p.slug}`)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl border border-white/6 hover:border-emerald-500/30 transition-all duration-500 bg-[#111]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Video badge */}
                    {p.videoId && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        <span className="text-white/60 text-xs">Video</span>
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${p.status === 'Ready Possession' ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30' : 'text-blue-400 bg-blue-500/15 border border-blue-500/20'}`}>
                        {p.status.split(' — ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-white/30 text-xs mb-1">{p.location}</div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 leading-snug">
                      {p.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.type && (
                        <span className="text-white/30 text-xs border border-white/8 rounded-full px-3 py-1">{p.type}</span>
                      )}
                      {p.bhk && (
                        <span className="text-white/30 text-xs border border-white/8 rounded-full px-3 py-1">{p.bhk}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-emerald-400 text-sm font-medium group-hover:underline underline-offset-2">
                        Explore Project →
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setModal({ open: true, project: p.name })
                        }}
                        className="text-xs text-white/30 hover:text-emerald-400 transition-colors border border-white/8 hover:border-emerald-500/30 rounded-full px-3 py-1.5"
                      >
                        Express Interest
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Get Connected</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Interested in a {dev.name} Property?
            </h2>
            <p className="text-white/40 mb-8">
              Share your requirements and our team will reach out with curated options and exclusive pricing.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setModal({ open: true, project: `${dev.name} — General Enquiry` })}
              className="px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm"
            >
              Register Interest →
            </motion.button>
          </motion.div>
        </div>
      </section>

      <InterestModal open={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))} project={modal.project} />
    </main>
  )
}
