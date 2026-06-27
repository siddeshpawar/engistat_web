import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/real-estate', label: 'Real Estate' },
  { to: '/training', label: 'Training' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Hide on project detail pages — they render their own developer-branded header
  const isProjectPage = /^\/real-estate\/[^/]+\/[^/]+/.test(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  if (isProjectPage) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/95 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-display font-bold tracking-tight">
              <span className="text-gradient">ENGI</span>
              <span className="text-white">STAT</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  location.pathname === link.to
                    ? 'text-emerald-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-emerald-500 transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:siddeshvilaspawar@gmail.com"
              className="text-sm px-5 py-2 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                open ? 'w-5 rotate-45 translate-y-2' : 'w-6'
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                open ? 'opacity-0 w-0' : 'w-5'
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                open ? 'w-5 -rotate-45 -translate-y-2' : 'w-4'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full gap-10 transition-all duration-500 ${
            open ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-3xl font-display font-semibold transition-all duration-300 ${
                location.pathname === link.to ? 'text-gradient' : 'text-white/70 hover:text-white'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:siddeshvilaspawar@gmail.com"
            className="mt-4 px-8 py-3 rounded-full border border-emerald-500 text-emerald-400 text-sm hover:bg-emerald-500/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  )
}
