import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getStoredVisitor } from './PhoneGate'

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const panel = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.2 } },
}

export default function InterestModal({ open, onClose, project = '' }) {
  const visitor = getStoredVisitor()
  const [form, setForm] = useState({
    name: visitor?.name || '',
    email: '',
    phone: visitor?.phone || '',
    message: '',
  })

  // Re-sync if visitor appears after mount
  useEffect(() => {
    if (open) {
      const v = getStoredVisitor()
      setForm((f) => ({
        ...f,
        name: f.name || v?.name || '',
        phone: f.phone || v?.phone || '',
      }))
    }
  }, [open])
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = project
      ? `Property Interest — ${project}`
      : 'Enquiry — Engistat'
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Interested in: ${project || 'General enquiry'}`,
      '',
      form.message,
    ].join('\n')
    window.open(
      `mailto:siddesh.pawar@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    )
    setSent(true)
    setTimeout(() => {
      setSent(false)
      onClose()
      const v = getStoredVisitor()
      setForm({ name: v?.name || '', email: '', phone: v?.phone || '', message: '' })
    }, 2800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Emerald top border glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            <div className="bg-[#111111] p-8 sm:p-10">
              {sent ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-display font-bold mb-2">Your mail app opened!</h3>
                  <p className="text-white/50 text-sm">We will reach out shortly at the email you provided.</p>
                </motion.div>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="mb-7">
                    <p className="text-emerald-400 text-xs uppercase tracking-widest mb-1">Express Interest</p>
                    <h2 className="text-white font-display text-2xl font-bold leading-snug">
                      {project || 'Get in Touch'}
                    </h2>
                    <p className="text-white/40 text-sm mt-2">
                      Share your details and we will contact you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs mb-1.5 block">Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1.5 block">Phone</label>
                        <input
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+91 ..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white/40 text-xs mb-1.5 block">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-white/40 text-xs mb-1.5 block">Message</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Budget, preferred location, timeline..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wide transition-colors mt-1"
                    >
                      Send Enquiry via Email
                    </motion.button>

                    <p className="text-white/20 text-xs text-center">
                      Opens your mail app with a pre-filled message to siddesh.pawar@outlook.com
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
