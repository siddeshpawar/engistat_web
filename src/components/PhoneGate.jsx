import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'engistat_visitor'

export function getStoredVisitor() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function storeVisitor(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export default function PhoneGate({ children }) {
  const [phase, setPhase] = useState('loading') // 'loading' | 'gate' | 'open'
  const [form, setForm] = useState({ name: '', phone: '' })
  const [err, setErr] = useState('')

  useEffect(() => {
    const visitor = getStoredVisitor()
    if (visitor?.phone) {
      setPhase('open')
    } else {
      setTimeout(() => setPhase('gate'), 300)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setErr('Please enter a valid 10-digit mobile number.')
      return
    }
    storeVisitor({ name: form.name, phone: form.phone, ts: Date.now() })
    setPhase('open')
  }

  if (phase === 'loading') return <>{children}</>

  return (
    <>
      {/* Page content — always visible, blurred when gate is active */}
      <div
        style={{
          filter: phase === 'gate' ? 'blur(6px)' : 'none',
          transition: 'filter 0.5s ease',
          pointerEvents: phase === 'gate' ? 'none' : 'auto',
        }}
      >
        {children}
      </div>

      {/* Bottom-sheet gate */}
      <AnimatePresence>
        {phase === 'gate' && (
          <>
            {/* Dim overlay */}
            <motion.div
              className="fixed inset-0 z-[190] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            >
              <div className="max-w-lg mx-auto">
                {/* Pull handle */}
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                <div className="bg-[#111] rounded-3xl overflow-hidden shadow-2xl">
                  {/* Top glow line */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                  <div className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse block" />
                          <span className="text-emerald-400 text-xs uppercase tracking-widest">Premium Access</span>
                        </div>
                        <h2 className="font-display text-xl font-bold text-white">
                          Welcome to Engistat Real Estate
                        </h2>
                        <p className="text-white/40 text-xs mt-1">
                          Share your details to explore our curated property portfolio.
                        </p>
                      </div>
                      <div className="text-lg font-display font-bold shrink-0 ml-4">
                        <span className="text-gradient">ENGI</span>
                        <span className="text-white">STAT</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-white/30 text-xs mb-1 block">Your Name</label>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="Full name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/30 text-xs mb-1 block">Mobile *</label>
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(e) => { setErr(''); setForm((f) => ({ ...f, phone: e.target.value })) }}
                            placeholder="+91 9876543210"
                            maxLength={13}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
                          />
                        </div>
                      </div>
                      {err && <p className="text-red-400 text-xs">{err}</p>}

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-colors"
                      >
                        Explore Properties →
                      </motion.button>
                      <p className="text-white/15 text-xs text-center">
                        Stored locally on your device only. We respect your privacy.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
