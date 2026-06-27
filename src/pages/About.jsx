import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import InterestModal from '../components/InterestModal'

const expertise = [
  { area: 'Network Security', detail: 'Cisco, Juniper, Palo Alto, Fortinet', icon: '🛡️' },
  { area: 'Post-Quantum Cryptography', detail: 'CRYSTALS-Kyber, Dilithium, SPHINCS+', icon: '⚛️' },
  { area: 'IAM & AAA', detail: 'Aruba ClearPass, RADIUS, TACACS+, 802.1X', icon: '🔐' },
  { area: 'Network Architecture', detail: 'Enterprise infrastructure design & optimisation', icon: '🌐' },
  { area: 'Python Automation', detail: 'Network automation, monitoring, security tooling', icon: '🐍' },
  { area: 'IoT & Embedded', detail: 'Arduino, ESP32, MQTT, prototype-to-product', icon: '🔧' },
]

const timeline = [
  {
    year: 'Nov 2025',
    role: 'Published Researcher',
    org: 'TechRxiv / IEEE',
    detail: '"Design and Evaluation of StrongVPN: A Pure Post-Quantum VPN Architecture" — novel VPN using NIST-approved PQC algorithms.',
    type: 'publication',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  },
  {
    year: '2024–Present',
    role: 'MSc Cyber Security',
    org: 'University of Surrey, Guildford, UK',
    detail: 'Advanced research in post-quantum cryptography, applied cybersecurity, and network security architectures.',
    type: 'education',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
  },
  {
    year: '2023',
    role: 'Founder',
    org: 'Engistat',
    detail: 'Founded Engistat — a multi-venture company spanning real estate, technology training, and professional consultancy.',
    type: 'venture',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
  },
  {
    year: '2022',
    role: 'Network Automation Specialist',
    org: 'GVK — Mumbai International Airport',
    detail: 'Python-based network automation solutions that significantly improved security operations. Received formal appreciation.',
    type: 'work',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
  },
  {
    year: '2021',
    role: 'Innovation Award',
    org: 'Maker Mela, Mumbai',
    detail: "Awarded for innovative AR application development at India's premier maker event.",
    type: 'award',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
  },
  {
    year: '2018–2022',
    role: 'Cyber Security & Network Engineer',
    org: 'Enterprise Clients — Mumbai',
    detail: 'Six-plus years deploying and managing enterprise security stacks across multiple industry verticals.',
    type: 'work',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  },
]

const typeColors = {
  publication: '#a78bfa',
  education: '#60a5fa',
  venture: '#10b981',
  work: '#fbbf24',
  award: '#fb923c',
}

const tools = [
  'Cisco IOS/IOS-XE', 'Juniper JunOS', 'Palo Alto NGFW', 'Fortinet FortiGate',
  'Aruba ClearPass', 'RADIUS / TACACS+', '802.1X', 'Zero Trust NAC',
  'Python / Netmiko', 'Ansible', 'CRYSTALS-Kyber', 'CRYSTALS-Dilithium',
  'SPHINCS+', 'OpenSSL', 'WireGuard', 'IPsec / OpenVPN',
  'Arduino / ESP32', 'MQTT', 'KiCad', 'Wireshark',
]

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Image */}
      <div className="hidden md:block w-72 h-44 rounded-2xl overflow-hidden shrink-0 relative">
        <img src={item.image} alt={item.role} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 border-current shadow-lg"
          style={{ color: typeColors[item.type], boxShadow: `0 0 12px ${typeColors[item.type]}60` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 border border-white/6 rounded-2xl p-6 bg-white/2">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ color: typeColors[item.type], borderColor: `${typeColors[item.type]}40` }}
          >
            {item.year}
          </span>
        </div>
        <h3 className="text-white font-semibold text-base mb-0.5">{item.role}</h3>
        <p className="text-white/40 text-sm mb-3">{item.org}</p>
        <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [modalOpen, setModalOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '35%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  return (
    <main className="bg-obsidian">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroImgY }}>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=2000&auto=format&fit=crop&q=85"
            alt="Siddesh Pawar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 grid md:grid-cols-2 gap-12 items-end"
        >
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
              Engistat Founder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Siddesh<br />
              <span className="text-gradient">Vilas Pawar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/50 text-lg leading-relaxed mb-8"
            >
              Cyber Security &amp; Network Engineering Specialist.<br />
              6+ years. Published researcher. University of Surrey, UK.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors"
              >
                Get in Touch →
              </motion.button>
              <a
                href="https://siddeshpawar.github.io/web/SiddeshVilasPawarCV_2026_f2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/15 text-white/60 hover:text-white text-sm transition-colors"
              >
                Download CV ↓
              </a>
            </motion.div>
          </div>

          {/* Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="border border-white/8 rounded-2xl p-5 bg-black/40 backdrop-blur-sm">
              <div className="text-amber-400 text-xs uppercase tracking-widest mb-2">GVK — Mumbai Airport</div>
              <p className="text-white/60 text-sm leading-relaxed italic">
                "Appreciated for network automation solutions that improved our security operations."
              </p>
            </div>
            <div className="border border-purple-500/20 rounded-2xl p-5 bg-black/40 backdrop-blur-sm">
              <div className="text-purple-400 text-xs uppercase tracking-widest mb-2">Published · Nov 2025 · TechRxiv</div>
              <p className="text-white/70 text-sm font-medium leading-snug">
                StrongVPN: A Pure Post-Quantum VPN Architecture
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── EXPERTISE STRIP ── */}
      <section className="py-24 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Domains</span>
            <h2 className="font-display text-5xl font-bold text-white mt-2">Areas of Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {expertise.map((e, i) => (
              <motion.div
                key={e.area}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-obsidian hover:bg-white/3 p-8 transition-colors duration-300 group cursor-default"
              >
                <span className="text-3xl block mb-4">{e.icon}</span>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-emerald-400 transition-colors">
                  {e.area}
                </h3>
                <p className="text-white/35 text-sm">{e.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Career</span>
            <h2 className="font-display text-5xl font-bold text-white mt-2">Professional Journey</h2>
          </motion.div>

          <div className="flex flex-col gap-10">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Tech Stack</span>
            <h2 className="font-display text-3xl font-bold text-white mt-2">Tools &amp; Technologies</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, color: '#10b981' }}
                className="text-sm text-white/50 bg-white/4 px-4 py-2 rounded-full border border-white/8 cursor-default transition-colors"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-8 text-center"
        >
          <span className="text-emerald-400 text-xs uppercase tracking-[0.3em]">Open to Collaboration</span>
          <h2 className="font-display text-5xl font-bold text-white mt-4 mb-6">
            Let us Build Something Together.
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed mb-10">
            Security consultation, training partnership, real estate enquiry,
            or investment in Engistat — reach out directly.
          </p>
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm"
          >
            Get in Touch →
          </motion.button>
        </motion.div>
      </section>

      <InterestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project="General Collaboration Enquiry"
      />
    </main>
  )
}
