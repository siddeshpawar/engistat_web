import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-display font-bold mb-4">
              <span className="text-gradient">ENGI</span>
              <span className="text-white">STAT</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A parent company venturing into real estate, professional training, and technology.
              Building tomorrow's infrastructure today.
            </p>
            <div className="mt-6 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-xs ml-1">Open for CSR & Funding</span>
            </div>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-5">Ventures</h4>
            <div className="flex flex-col gap-3">
              <Link to="/real-estate" className="text-white/60 hover:text-white text-sm transition-colors">Real Estate</Link>
              <Link to="/training" className="text-white/60 hover:text-white text-sm transition-colors">Training & Dev</Link>
              <Link to="/about" className="text-white/60 hover:text-white text-sm transition-colors">Professional Journey</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-5">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:siddeshvilaspawar@gmail.com"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                siddeshvilaspawar@gmail.com
              </a>
              <a
                href="https://siddeshpawar.github.io/web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-emerald-400 text-sm transition-colors"
              >
                Portfolio →
              </a>
              <a
                href="https://maharera.maharashtra.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-emerald-400 text-sm transition-colors"
              >
                MahaRERA →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2026 Engistat. All rights reserved.</p>
          <p className="text-white/20 text-xs">
            Siddesh Vilas Pawar · Cyber Security & Network Engineer
          </p>
        </div>
      </div>
    </footer>
  )
}
