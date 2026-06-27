import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import InterestModal from '../components/InterestModal'

const courses = [
  {
    id: 1,
    title: 'How the Internet Works',
    sub: 'Foundations of Modern Networking',
    duration: '3 Hours',
    level: 'Beginner → Intermediate',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=85',
    color: 'from-cyan-900/40 to-blue-900/40',
    topics: ['OSI & TCP/IP Models', 'DNS Deep-dive', 'HTTP/HTTPS & TLS', 'BGP Routing', 'CDN & Load Balancing', 'Wi-Fi vs Cellular'],
    description: 'Demystify the internet from the ground up. Understand how data travels globally, how your browser resolves a URL, and what really happens when you hit Enter.',
  },
  {
    id: 2,
    title: 'Security via IAM & AAA',
    sub: 'Hands-on ClearPass Workshop',
    duration: '4 Hours',
    level: 'Intermediate → Advanced',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&auto=format&fit=crop&q=85',
    color: 'from-emerald-900/40 to-teal-900/40',
    topics: ['IAM Architecture', 'AAA Framework', 'Aruba ClearPass CPPM', 'RADIUS & TACACS+', '802.1X Port Auth', 'Policy Enforcement'],
    description: 'Enterprise-grade identity and access management. Live lab using Aruba ClearPass CPPM — the exact stack deployed at major airports and financial institutions.',
  },
  {
    id: 3,
    title: 'Home Automation',
    sub: 'Microcontroller Systems from Scratch',
    duration: '4 Hours',
    level: 'Beginner → Intermediate',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1600&auto=format&fit=crop&q=85',
    color: 'from-orange-900/40 to-amber-900/40',
    topics: ['Arduino & ESP32', 'DHT22, PIR, Relay', 'MQTT Protocol', 'Mobile App Control', 'Circuit Design', 'Alexa / Google Integration'],
    description: 'Build a working smart home system from scratch. Control lights, sensors, and appliances from your phone — no prior hardware experience required.',
  },
  {
    id: 4,
    title: 'Prototype to Product',
    sub: 'From Idea to Market-Ready Hardware',
    duration: '5 Hours (2 Sessions)',
    level: 'Intermediate → Advanced',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=85',
    color: 'from-purple-900/40 to-pink-900/40',
    topics: ['Rapid Prototyping', 'PCB Design (KiCad)', 'Enclosure Engineering', 'Firmware Hardening', 'CE/FCC/BIS Basics', 'Manufacturing Costs'],
    description: 'Bridge the gap between your working prototype and a shippable product. PCB design, enclosure engineering, firmware, certifications, and manufacturer pitch.',
  },
]

function CourseSection({ course, index, onInterest }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color}`} />
        <div
          className={`absolute inset-0 ${
            isEven
              ? 'bg-gradient-to-r from-black/95 via-black/80 to-black/30'
              : 'bg-gradient-to-l from-black/95 via-black/80 to-black/30'
          }`}
        />
      </motion.div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-24 flex ${isEven ? 'justify-start' : 'justify-end'}`}>
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-emerald-500 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
            <div className="h-px w-8 bg-emerald-500/50" />
            <span className="text-white/30 text-xs uppercase tracking-widest">{course.level}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/30 text-xs uppercase tracking-widest mb-2"
          >
            {course.sub}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
          >
            {course.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white/50 text-base leading-relaxed mb-6"
          >
            {course.description}
          </motion.p>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8"
          >
            {course.topics.map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                {t}
              </div>
            ))}
          </motion.div>

          {/* Meta + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="text-xs text-white/30 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration} · Live Google Meet
            </span>
            <motion.button
              onClick={() => onInterest(`Training: ${course.title}`)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors"
            >
              Register Interest
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Training() {
  const [modal, setModal] = useState({ open: false, project: '' })
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '35%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  const openModal = (project) => setModal({ open: true, project })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

  return (
    <main className="bg-obsidian">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=2000&auto=format&fit=crop&q=85"
            alt="Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
            Engistat Training &amp; Development
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Learn from a<br />
            <span className="text-gradient">Security Expert.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/50 text-lg max-w-lg leading-relaxed mb-10"
          >
            Four live workshops. Paid sessions via Google Meet.
            CSR eligible for organisations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => openModal('Training — General Enquiry')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm"
            >
              Register Interest →
            </motion.button>
            <motion.button
              onClick={() => openModal('CSR / Institutional Partnership')}
              whileHover={{ scale: 1.04 }}
              className="px-9 py-4 rounded-full border border-white/15 text-white/60 hover:text-white text-sm transition-colors"
            >
              CSR Partnership
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── COURSE SECTIONS ── */}
      {courses.map((course, i) => (
        <CourseSection key={course.id} course={course} index={i} onInterest={openModal} />
      ))}

      {/* ── CSR SECTION ── */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, transparent 60%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">CSR Eligible</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-5 leading-tight">
              Sponsor Access<br />to Knowledge.
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Our programs qualify under the Companies Act Schedule VII for skill development
              and vocational training. Full utilisation reports provided.
            </p>
            {[
              'Skill development for underserved communities',
              'Aligned with National Education Policy goals',
              'Transparent reporting and certification',
            ].map((p) => (
              <div key={p} className="flex items-start gap-3 text-sm text-white/50 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                {p}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {['Single Session Sponsor', 'Full Program Partner', 'Institutional Tie-Up'].map((track) => (
              <motion.button
                key={track}
                onClick={() => openModal(`CSR: ${track}`)}
                whileHover={{ x: 4 }}
                className="text-left p-5 rounded-2xl border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{track}</span>
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <InterestModal
        open={modal.open}
        onClose={closeModal}
        project={modal.project}
      />
    </main>
  )
}
