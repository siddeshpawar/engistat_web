import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { developers } from '../data/projects'
import InterestModal from '../components/InterestModal'
import { getStoredVisitor } from '../components/PhoneGate'

// Developer-specific branding — no Engistat on this page
const DEV_THEME = {
  lodha: {
    accent:      '#c9a542',
    accentRgb:   '201,165,66',
    accentLight: 'rgba(201,165,66,0.15)',
    bg:          '#08090e',
    headerBg:    '#060710',
    brand:       'LODHA',
    sub:         'GROUP',
    tagline:     'Real Estate with a Difference',
    ctaLabel:    'Book a Private Viewing',
  },
  raheja: {
    accent:      '#c8946a',
    accentRgb:   '200,148,106',
    accentLight: 'rgba(200,148,106,0.15)',
    bg:          '#0e0905',
    headerBg:    '#0b0704',
    brand:       'K RAHEJA',
    sub:         'REALTY',
    tagline:     'Building Better Lives',
    ctaLabel:    'Schedule a Site Visit',
  },
  raymond: {
    accent:      '#6aaa7a',
    accentRgb:   '106,170,122',
    accentLight: 'rgba(106,170,122,0.15)',
    bg:          '#060e07',
    headerBg:    '#040b05',
    brand:       'RAYMOND',
    sub:         'REALTY',
    tagline:     'The Finest Residential Spaces',
    ctaLabel:    'Request a Callback',
  },
}

function GalleryModal({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  return (
    <motion.div
      className="fixed inset-0 z-[150] bg-black/98 flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-8 text-white/40 hover:text-white text-4xl z-10 leading-none">×</button>
      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length) }}
        className="absolute left-4 md:left-8 text-white/40 hover:text-white text-5xl px-2 z-10"
      >‹</button>

      <motion.img
        key={idx}
        src={images[idx]}
        alt=""
        className="max-w-[88vw] max-h-[82vh] object-contain rounded-2xl"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length) }}
        className="absolute right-4 md:right-8 text-white/40 hover:text-white text-5xl px-2 z-10"
      >›</button>
      <div className="absolute bottom-6 text-white/30 text-sm tracking-widest">{idx + 1} / {images.length}</div>
    </motion.div>
  )
}

export default function ProjectPage() {
  const { devSlug, projectSlug } = useParams()
  const dev = developers.find((d) => d.slug === devSlug)
  const project = dev?.projects.find((p) => p.slug === projectSlug)
  const theme = DEV_THEME[devSlug] ?? DEV_THEME.lodha

  const [modal, setModal] = useState(false)
  const [gallery, setGallery] = useState({ open: false, idx: 0 })
  const [mobileMenu, setMobileMenu] = useState(false)
  const visitor = getStoredVisitor()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  if (!dev || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20" style={{ background: theme.bg }}>
        <p className="text-white/40">Project not found.</p>
        <Link to="/real-estate" className="text-sm" style={{ color: theme.accent }}>← Back to Real Estate</Link>
      </div>
    )
  }

  const related = dev.projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <main style={{ background: theme.bg, color: 'white' }}>

      {/* ── DEVELOPER NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: `${theme.headerBg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid rgba(${theme.accentRgb},0.12)` }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back + Brand */}
          <div className="flex items-center gap-5">
            <Link to={`/real-estate/${dev.slug}`} className="text-white/30 hover:text-white transition-colors text-sm flex items-center gap-1.5">
              <span>←</span> <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <span className="font-bold tracking-widest text-base" style={{ color: theme.accent }}>
                {theme.brand}
              </span>
              <span className="text-white/40 text-xs ml-1">{theme.sub}</span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-white/30 text-xs">{project.name}</span>
            <button
              onClick={() => setModal(true)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{ background: theme.accent, color: theme.bg }}
            >
              {theme.ctaLabel}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenu((v) => !v)} className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5">
            <span className={`block h-0.5 bg-white transition-all ${mobileMenu ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
            <span className={`block h-0.5 bg-white transition-all ${mobileMenu ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-white transition-all ${mobileMenu ? 'w-5 -rotate-45 -translate-y-2' : 'w-3'}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="overflow-hidden border-t"
              style={{ borderColor: `rgba(${theme.accentRgb},0.1)` }}
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                <button onClick={() => { setModal(true); setMobileMenu(false) }}
                  className="w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ background: theme.accent, color: theme.bg }}
                >
                  {theme.ctaLabel}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.bg} 0%, ${theme.bg}99 25%, ${theme.bg}44 60%, transparent 100%)` }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20">
          {/* Status badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                color: project.status === 'Ready Possession' ? theme.accent : '#60a5fa',
                background: project.status === 'Ready Possession' ? theme.accentLight : 'rgba(96,165,250,0.12)',
                border: `1px solid ${project.status === 'Ready Possession' ? `rgba(${theme.accentRgb},0.3)` : 'rgba(96,165,250,0.2)'}`,
              }}
            >
              {project.status.split(' — ')[0]}
            </span>
            {project.rera && (
              <span className="text-white/25 text-xs">RERA: {project.rera}</span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'white' }}
          >
            {project.name}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/40 text-lg mb-3"
          >
            {project.location}
          </motion.p>

          {project.type && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-sm mb-8" style={{ color: theme.accent }}
            >
              {project.type} {project.bhk && `· ${project.bhk}`}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setModal(true)}
              className="px-9 py-4 rounded-full font-semibold text-sm"
              style={{ background: theme.accent, color: theme.bg }}
            >
              {theme.ctaLabel} →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setModal(true)}
              className="px-9 py-4 rounded-full text-sm border transition-all"
              style={{ borderColor: `rgba(${theme.accentRgb},0.3)`, color: `rgba(${theme.accentRgb},0.8)` }}
            >
              Download Brochure
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Developer watermark */}
        <div className="absolute top-24 right-8 text-right hidden md:block">
          <div className="font-bold text-2xl tracking-widest" style={{ color: `rgba(${theme.accentRgb},0.15)` }}>{theme.brand}</div>
          <div className="text-xs tracking-[0.4em]" style={{ color: `rgba(${theme.accentRgb},0.08)` }}>{theme.sub}</div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ borderTop: `1px solid rgba(${theme.accentRgb},0.1)`, borderBottom: `1px solid rgba(${theme.accentRgb},0.1)` }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Developer', value: dev.name },
            { label: 'Type', value: project.type || '—' },
            { label: 'Configuration', value: project.bhk || '—' },
            { label: 'Status', value: project.status.split(' — ')[0] },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white/25 text-xs uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-white font-semibold text-sm">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-20">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-xs uppercase tracking-[0.35em] mb-3 block" style={{ color: theme.accent }}>Project Overview</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">About {project.name}</h2>
              <p className="text-white/50 leading-relaxed text-base">{project.fullDesc}</p>
            </motion.div>

            {/* Photo Gallery */}
            {project.gallery?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <span className="text-xs uppercase tracking-[0.35em] mb-3 block" style={{ color: theme.accent }}>Gallery</span>
                <h2 className="font-display text-3xl font-bold text-white mb-7">Visuals</h2>

                {/* First image — large hero */}
                <div className="relative overflow-hidden rounded-3xl mb-3 cursor-pointer group aspect-[16/9]"
                  onClick={() => setGallery({ open: true, idx: 0 })}>
                  <img src={project.gallery[0]} alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-600" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-white/60 text-xs">View all {project.gallery.length}</span>
                  </div>
                </div>

                {/* Remaining as smaller grid */}
                {project.gallery.length > 1 && (
                  <div className={`grid gap-3 ${project.gallery.length === 2 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
                    {project.gallery.slice(1).map((img, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/3]"
                        onClick={() => setGallery({ open: true, idx: i + 1 })}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <span className="text-xs uppercase tracking-[0.35em] mb-3 block" style={{ color: theme.accent }}>Key Highlights</span>
                <h2 className="font-display text-3xl font-bold text-white mb-7">What Sets It Apart</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights.map((h, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}
                      className="flex items-start gap-3 p-5 rounded-2xl"
                      style={{ background: theme.accentLight, border: `1px solid rgba(${theme.accentRgb},0.15)` }}
                    >
                      <span style={{ color: theme.accent }} className="text-lg mt-0.5 shrink-0">✦</span>
                      <span className="text-white/70 text-sm leading-relaxed">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Amenities */}
            {project.amenities?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <span className="text-xs uppercase tracking-[0.35em] mb-3 block" style={{ color: theme.accent }}>Amenities</span>
                <h2 className="font-display text-3xl font-bold text-white mb-7">World-Class Facilities</h2>
                <div className="flex flex-wrap gap-3">
                  {project.amenities.map((a) => (
                    <span key={a}
                      className="text-white/50 text-sm rounded-full px-4 py-2 transition-all cursor-default"
                      style={{ border: `1px solid rgba(${theme.accentRgb},0.2)` }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Floor Plans */}
            {project.floorPlans?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <span className="text-xs uppercase tracking-[0.35em] mb-3 block" style={{ color: theme.accent }}>Configurations</span>
                <h2 className="font-display text-3xl font-bold text-white mb-7">Floor Plans</h2>
                <div className="space-y-3">
                  {project.floorPlans.map((fp, i) => {
                    // fp may be a string "3 BHK — 2,600 sq ft" or object {type, area}
                    const label = typeof fp === 'string' ? fp : `${fp.type} — ${fp.area}`
                    const [config, area] = label.includes(' — ') ? label.split(' — ') : [label, '']
                    return (
                      <div key={i}
                        className="flex items-center justify-between p-5 rounded-2xl transition-colors"
                        style={{ background: theme.accentLight, border: `1px solid rgba(${theme.accentRgb},0.12)` }}
                      >
                        <div>
                          <div className="text-white font-semibold text-sm">{config}</div>
                          {area && <div className="text-white/30 text-xs mt-0.5">{area}</div>}
                        </div>
                        <button onClick={() => setModal(true)}
                          className="text-xs font-medium transition-colors"
                          style={{ color: theme.accent }}
                        >
                          Enquire →
                        </button>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Sticky enquiry card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                className="rounded-3xl p-7"
                style={{
                  background: theme.headerBg,
                  border: `1px solid rgba(${theme.accentRgb},0.2)`,
                }}
              >
                <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: theme.accent }}>
                  Get in Touch
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {visitor?.name ? `Hi ${visitor.name.split(' ')[0]}, ` : ''}
                  Speak with our team for pricing, availability, and a personalised advisory.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setModal(true)}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-colors"
                  style={{ background: theme.accent, color: theme.bg }}
                >
                  {theme.ctaLabel} →
                </motion.button>
                <button onClick={() => setModal(true)}
                  className="w-full mt-3 py-3 rounded-xl text-sm border transition-all"
                  style={{ borderColor: `rgba(${theme.accentRgb},0.2)`, color: `rgba(${theme.accentRgb},0.7)` }}
                >
                  Request Brochure
                </button>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.8 }} viewport={{ once: true }}
                className="rounded-3xl p-6 space-y-4"
                style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid rgba(255,255,255,0.06)` }}
              >
                <div className="text-white/25 text-xs uppercase tracking-widest mb-4">Project Details</div>
                {[
                  { label: 'Developer', value: dev.name },
                  { label: 'Location', value: project.location },
                  { label: 'Type', value: project.type },
                  { label: 'Configuration', value: project.bhk },
                  { label: 'Status', value: project.status },
                  { label: 'RERA No.', value: project.rera },
                ].filter((r) => r.value).map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-white/30 shrink-0">{row.label}</span>
                    <span className="text-white/70 text-right">{row.value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Disclaimer */}
              <div className="text-white/15 text-xs leading-relaxed px-1">
                All information is indicative. Prices and specifications are subject to change. Verify RERA details before any transaction.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED PROJECTS ── */}
      {related.length > 0 && (
        <section className="py-20 px-6" style={{ borderTop: `1px solid rgba(${theme.accentRgb},0.08)` }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>More from {dev.name}</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2">Other Projects</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }} viewport={{ once: true }}>
                  <Link to={`/real-estate/${dev.slug}/${p.slug}`}
                    className="group block relative overflow-hidden rounded-2xl h-52 transition-all duration-400"
                    style={{ border: `1px solid rgba(${theme.accentRgb},0.1)` }}
                  >
                    <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-white/30 text-xs mb-0.5">{p.location.split(',')[0]}</div>
                      <div className="text-white font-semibold group-hover:transition-colors">{p.name}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: `1px solid rgba(${theme.accentRgb},0.08)` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/15 text-xs text-center md:text-left">
            {project.name} · {dev.name} · {project.location}
            {project.rera && ` · RERA: ${project.rera}`}
          </div>
          <div className="text-white/10 text-xs text-center md:text-right">
            Marketed by <span className="text-white/20">Engistat</span> — Authorised Channel Partner
          </div>
        </div>
      </footer>

      {/* Gallery lightbox */}
      <AnimatePresence>
        {gallery.open && (
          <GalleryModal
            images={project.gallery}
            startIndex={gallery.idx}
            onClose={() => setGallery({ open: false, idx: 0 })}
          />
        )}
      </AnimatePresence>

      <InterestModal open={modal} onClose={() => setModal(false)} project={project.name} />
    </main>
  )
}
